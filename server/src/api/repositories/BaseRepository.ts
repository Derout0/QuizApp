import database from '@/config/DatabaseConfig.ts'
import { camelToSnakeCase, snakeToCamelCase } from '@/api/utils/utils.ts'

interface FindOptions<T> {
    where?: Partial<T>
    returning?: ReturningOptions<T>
    limit?: number
    offset?: number
    search?: {
        field: keyof T
        query: string
    }
}

export type FieldMapping<T> = {
    [key in keyof T]?: string
}

type ReturningOptions<T> = {
    include?: Array<keyof T>
    exclude?: Array<keyof T>
}

export class BaseRepository<T> {
    private readonly tableName: string
    private readonly fieldMapping: FieldMapping<T>

    constructor(tableName: string, fieldMapping: FieldMapping<T>) {
        this.tableName = tableName
        this.fieldMapping = fieldMapping
    }

    /**
     * Выполняет преобразование полей из camelCase в snake_case перед выполнением SQL-запроса,
     * после чего в обратном порядке преобразует результаты в camelCase.
     * Поддерживает параметры (returning) для указания полей, которые необходимо возвращать.
     *
     * @template T - Тип, представляющий структуру данных (Например: UserModel).
     * @param {function(mappedUpdates: Record<string, any>, mappedWhere: Record<string, any>, returningClause: string): Promise<any>} method - Функция, выполняющая основной SQL-запрос с преобразованными данными.
     * @param {Partial<T> | null} [updates] - Поля, которые будут обновлены в базе данных.
     * @param {Partial<T> | null} [where] - Условия для фильтрации данных в запросе.
     * @param {ReturningOptions<T> | null} [returning] - Опции для указания, какие поля возвращать в результате запроса.
     *                                              Может содержать `include` (массив полей для возврата) или
     *                                              `exclude` (массив полей для исключения из результата).
     *
     * @returns {Promise<any>} Преобразованные результаты SQL-запроса.
     *
     * @example пример преобразованиий
     * updates: { userId: 1, firstName: 'New Name' } → преобразуется в { user_id: 1, first_name: 'New Name' }
     */
    private async executeMapping(
        method: (mappedUpdates: Record<string, any>, mappedWhere: Record<string, any>, returningClause: string) => Promise<any>,
        updates?: Partial<T> | null,
        where?: Partial<T> | null,
        returning?: ReturningOptions<T> | null,
    ): Promise<any> {
        // Преобразование в snake_case
        const mappedUpdates = this.mapFieldsToSnakeCase(updates || {})
        const mappedWhere = this.mapFieldsToSnakeCase(where || {})

        // Логика формирования returningClause
        let returningClause = '*'
        if (returning) {
            if (returning.include) {
                returningClause = returning.include
                    .map(field => this.fieldMapping[field] || camelToSnakeCase(field as string))
                    .join(', ')
            }
            else if (returning.exclude) {
                const allFields = Object.keys(this.fieldMapping) as (Array<keyof T>)
                const fieldsToReturn = allFields.filter(field => !returning.exclude?.includes(field))

                returningClause = fieldsToReturn
                    .map(field => this.fieldMapping[field] || camelToSnakeCase(field as string))
                    .join(', ')
            }
        }

        // Оригинальный метод
        const result = await method(mappedUpdates, mappedWhere, returningClause)

        // Преобразование в camelCase
        if (Array.isArray(result)) {
            return result.map(row => this.mapFieldsToCamelCase(row))
        }
        else if (result && typeof result === 'object') {
            return this.mapFieldsToCamelCase(result)
        }

        return result
    }

    private mapFieldsToSnakeCase(columns: Partial<T>): Record<string, any> {
        const mapped: Record<string, any> = {}

        for (const [key, value] of Object.entries(columns)) {
            const snakeKey = this.fieldMapping[key as keyof T] || camelToSnakeCase(key)
            mapped[snakeKey] = value
        }

        return mapped
    }

    private mapFieldsToCamelCase(row: Record<string, any>): T {
        const mapped: Record<string, any> = {}

        for (const [key, value] of Object.entries(row)) {
            const camelKey = Object.keys(this.fieldMapping).find(
                k => this.fieldMapping[k as keyof T] === key,
            ) || snakeToCamelCase(key)

            mapped[camelKey] = value
        }

        return mapped as T
    }

    private buildFindQuery(
        where: Record<string, any>,
        returning?: string,
        limit?: number,
        offset?: number,
        search?: { field: keyof T, query: string },
    ): { whereClause: string, queryRows: string, queryCount: string, values: any[] } {
        const keys = Object.keys(where)
        const values = Object.values(where)

        const searchConditions: string[] = []

        if (search) {
            const searchField = search.field
            const searchQuery = `%${search.query}%`

            searchConditions.push(`${String(searchField)} ILIKE $${keys.length + searchConditions.length + 1}`)
            values.push(searchQuery)
        }

        const conditions = [
            ...keys.map((key, index) => `${key} = $${index + 1}`),
            ...searchConditions, // Добавляем поиск
        ]

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
        const limitClause = limit ? `LIMIT ${limit}` : ''
        const offsetClause = offset ? `OFFSET ${offset}` : ''

        const queryRows = `
            SELECT ${returning} FROM ${this.tableName}
            ${whereClause}
            ${limitClause}
            ${offsetClause}
        `.trim()

        const queryCount = `
            SELECT COUNT(*) AS count FROM ${this.tableName}
            ${whereClause}
        `.trim()

        return { whereClause, queryRows, queryCount, values }
    }

    public async getAll(): Promise<T[]> {
        return this.executeMapping(async () => {
            const result = await database.query(`SELECT * FROM ${this.tableName}`)

            return result.rows
        })
    }

    public async findBy(
        where: Partial<T>,
        returning?: ReturningOptions<T>,
    ): Promise<T | null> {
        return this.executeMapping(async (mappedColumns, mappedWhere, returningClause) => {
            const keys = Object.keys(mappedWhere)
            const values = Object.values(mappedWhere)

            if (keys.length === 0) return null

            const query = `SELECT ${returningClause} FROM ${this.tableName} WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`

            const result = await database.query(query, values)

            return result.rows.length ? result.rows[0] : null
        }, null, where, returning)
    }

    public async findAll(options: FindOptions<T> = {}): Promise<T[]> {
        const { where = {}, returning, limit, offset, search } = options

        return this.executeMapping(async (_, mappedWhere, returningClause) => {
            const { queryRows, values } = this.buildFindQuery(mappedWhere, returningClause, limit, offset, search)

            const result = await database.query(queryRows, values)

            return result.rows
        }, null, where, returning)
    }

    public async findAndCountAll(options: FindOptions<T> = {}): Promise<{ rows: T[], count: number }> {
        const { where = {}, returning, limit, offset, search } = options

        const rowsPromise = this.executeMapping(async (_, mappedWhere, returningClause) => {
            const { queryRows, values } = this.buildFindQuery(mappedWhere, returningClause, limit, offset, search)

            const result = await database.query(queryRows, values)

            return result.rows
        }, null, where, returning)

        const countPromise = (async () => {
            const { queryCount, values } = this.buildFindQuery(this.mapFieldsToSnakeCase(where), '*', undefined, undefined)
            const result = await database.query(queryCount, values)
            return parseInt(result.rows[0].count, 10)
        })()

        const [rows, count] = await Promise.all([rowsPromise, countPromise])

        return { rows, count }
    }

    public async create(columns: Partial<T>, returning?: ReturningOptions<T>): Promise<T> {
        return this.executeMapping(async (mappedColumns, _, returningClause) => {
            const keys = Object.keys(mappedColumns)
            const values = Object.values(mappedColumns)

            const query = `
                INSERT INTO ${this.tableName} (${keys.join(', ')})
                VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) 
                RETURNING ${returningClause}
            `

            const result = await database.query(query, values)

            return result.rows[0]
        }, columns, null, returning)
    }

    public async update(updates: Partial<T>, where: Partial<T>, returning?: ReturningOptions<T>): Promise<T> {
        return this.executeMapping(async (mappedUpdates, mappedWhere, returningClause) => {
            const updateKeys = Object.keys(mappedUpdates)
            const updateValues = Object.values(mappedUpdates)

            const whereKeys = Object.keys(mappedWhere)
            const whereValues = Object.values(mappedWhere)

            const setClause = updateKeys.map((key, index) => `${key} = $${index + 1}`).join(', ')
            const whereClause = whereKeys.map((key, index) => `${key} = $${updateKeys.length + index + 1}`).join(' AND ')

            const query = `
                UPDATE ${this.tableName}
                SET ${setClause} 
                WHERE ${whereClause} 
                RETURNING ${returningClause}
            `

            const result = await database.query(query, [...updateValues, ...whereValues])

            return result.rows[0]
        }, updates, where, returning)
    }

    public async delete(where: Partial<T>, returning?: ReturningOptions<T>): Promise<void> {
        return this.executeMapping(async (_, mappedWhere, returningClause) => {
            const whereKeys = Object.keys(mappedWhere)
            const whereValues = Object.values(mappedWhere)

            const whereClause = whereKeys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')

            const query = `
                DELETE FROM ${this.tableName} 
                WHERE ${whereClause} 
                RETURNING ${returningClause}`

            await database.query(query, whereValues)
        }, null, where, returning)
    }
}
