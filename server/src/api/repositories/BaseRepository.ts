import database from '@/config/DatabaseConfig.ts'
import { camelToSnakeCase, snakeToCamelCase } from '@/api/utils/utils.ts'

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

    public async getAll(): Promise<T[]> {
        return this.executeMapping(async () => {
            const result = await database.query(`SELECT * FROM ${this.tableName}`)

            return result.rows
        })
    }

    public async findBy(where: Partial<T>, returning?: ReturningOptions<T>): Promise<T | null> {
        return this.executeMapping(async (mappedColumns, mappedWhere, returningClause) => {
            const keys = Object.keys(mappedWhere)
            const values = Object.values(mappedWhere)

            if (keys.length === 0) return null

            const query = `SELECT ${returningClause} FROM ${this.tableName} WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`

            const result = await database.query(query, values)

            return result.rows.length ? result.rows[0] : null
        }, null, where, returning)
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
