import { Express } from 'express'
import { ErrorHandlingMiddleware } from '@/api/middleware/ErrorHandlingMiddleware.js'

export class InitializeMiddleware {
    public static async InitializeErrorHandlingMiddleware(app: Express) {
        const errorMiddleware = new ErrorHandlingMiddleware(app)

        await errorMiddleware.errorHandler()
    }
}
