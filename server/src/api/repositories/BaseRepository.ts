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

    // Маппинг ключей из camelCase в snake_case
    private mapFieldsToSnakeCase(columns: Partial<T>): Record<string, any> {
        const mapped: Record<string, any> = {}

        for (const [key, value] of Object.entries(columns)) {
            const snakeKey = this.fieldMapping[key as keyof T] || camelToSnakeCase(key)
            mapped[snakeKey] = value
        }

        return mapped
    }

    // Маппинг ключей из snake_case в camelCase
    private mapFieldsToCamelCase(row: Record<string, any>): T {
        const mapped: Record<string, any> = {}

        for (const [key, value] of Object.entries(row)) {
            const camelKey = Object.keys(this.fieldMapping).find(k => this.fieldMapping[k as keyof T] === key) || snakeToCamelCase(key)
            mapped[camelKey] = value
        }

        return mapped as T
    }

    public async getAll(): Promise<T[]> {
        const result = await database.query(`SELECT * FROM ${this.tableName}`)

        return result.rows.map(row => this.mapFieldsToCamelCase(row))
    }

    public async findBy(columns: Partial<T>): Promise<T | null> {
        const mappedColumns = this.mapFieldsToSnakeCase(columns)

        const keys = Object.keys(mappedColumns)
        const values = Object.values(mappedColumns)

        if (keys.length === 0) return null

        const query
            = `SELECT * FROM ${this.tableName} 
               WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`

        const result = await database.query(query, values)

        if (!result.rows.length) return null

        return this.mapFieldsToCamelCase(result.rows[0])
    }

    public async create(columns: Partial<T>): Promise<T> {
        const mappedColumns = this.mapFieldsToSnakeCase(columns)

        const keys = Object.keys(mappedColumns)
        const values = Object.values(mappedColumns)

        const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`
        const result = await database.query(query, values)

        return this.mapFieldsToCamelCase(result.rows[0])
    }

    public async update(updates: Partial<T>, where: Partial<T>): Promise<void> {
        const updateKeys = Object.keys(updates)
        const updateValues = Object.values(updates)

        const whereKeys = Object.keys(where)
        const whereValues = Object.values(where)

        const setClause = updateKeys.map((key, index) => `${key} = $${index + 1}`).join(', ')
        const whereClause = whereKeys.map((key, index) => `${key} = $${updateKeys.length + index + 1}`).join(' AND ')

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ${whereClause}`
        await database.query(query, [...updateValues, ...whereValues])
    }
}
