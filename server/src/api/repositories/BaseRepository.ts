import database from '@/config/DatabaseConfig.ts'
import { camelToSnakeCase, snakeToCamelCase } from '@/api/utils/utils.ts'

export type FieldMapping<T> = {
    [key in keyof T]?: string
}

export class BaseRepository<T> {
    private readonly tableName: string
    private readonly fieldMapping: FieldMapping<T>

    constructor(tableName: string, fieldMapping: FieldMapping<T>) {
        this.tableName = tableName
        this.fieldMapping = fieldMapping
    }

    private async executeMapping(method: (...args: any[]) => Promise<any>, ...args: any[]): Promise<any> {
        // Преобразовать в snake_case все переданные аргументы
        for (let i = 0; i < args.length; i++) {
            if (args[i] && typeof args[i] === 'object') {
                args[i] = this.mapFieldsToSnakeCase(args[i])
            }
        }

        // Выполнить оригинальный метод
        const result = await method.apply(this, args)

        // Преобразовать в camelCase
        if (Array.isArray(result)) {
            return result.map(row => this.mapFieldsToCamelCase(row))
        }
        else if (result && typeof result === 'object') {
            return this.mapFieldsToCamelCase(result)
        }

        return result
    }

    // Маппинг из camelCase в snake_case
    private mapFieldsToSnakeCase(columns: Partial<T>): Record<string, any> {
        const mapped: Record<string, any> = {}

        for (const [key, value] of Object.entries(columns)) {
            const snakeKey = this.fieldMapping[key as keyof T] || camelToSnakeCase(key)
            mapped[snakeKey] = value
        }

        return mapped
    }

    // Маппинг из snake_case в camelCase
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

    public async findBy(columns: Partial<T>): Promise<T | null> {
        return this.executeMapping(async (mappedColumns) => {
            const keys = Object.keys(mappedColumns)
            const values = Object.values(mappedColumns)

            if (keys.length === 0) return null

            const query = `SELECT * FROM ${this.tableName} WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`

            const result = await database.query(query, values)
            return result.rows.length ? result.rows[0] : null
        }, columns)
    }

    public async create(columns: Partial<T>): Promise<T> {
        return this.executeMapping(async (mappedColumns) => {
            const keys = Object.keys(mappedColumns)
            const values = Object.values(mappedColumns)
            console.log('KEYS', keys)
            console.log('Values', values)

            const query
                = `INSERT INTO ${this.tableName} (${keys.join(', ')}) 
                   VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`

            console.log('QUERY', query)
            const result = await database.query(query, values)

            return result.rows[0]
        }, columns)
    }

    public async update(updates: Partial<T>, where: Partial<T>): Promise<void> {
        return this.executeMapping(async (mappedUpdates, mappedWhere) => {
            const updateKeys = Object.keys(mappedUpdates)
            const updateValues = Object.values(mappedUpdates)

            const whereKeys = Object.keys(mappedWhere)
            const whereValues = Object.values(mappedWhere)

            const setClause = updateKeys.map((key, index) => `${key} = $${index + 1}`).join(', ')
            const whereClause = whereKeys.map((key, index) => `${key} = $${updateKeys.length + index + 1}`).join(' AND ')

            const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ${whereClause} RETURNING *`
            const result = await database.query(query, [...updateValues, ...whereValues])

            return result.rows
        }, updates, where)
    }

    public async delete(where: Partial<T>): Promise<void> {
        return this.executeMapping(async (mappedWhere) => {
            const whereKeys = Object.keys(mappedWhere)
            const whereValues = Object.values(mappedWhere)

            const whereClause = whereKeys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')

            const query = `DELETE FROM ${this.tableName} WHERE ${whereClause} RETURNING *`
            await database.query(query, whereValues)
        }, where)
    }
}
