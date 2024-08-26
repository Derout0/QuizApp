import { Express } from 'express'
import { ErrorHandlingMiddleware } from '@/api/middleware/ErrorHandlingMiddleware.js'
import { CommonMiddleware } from '@/api/middleware/CommonMiddleware.ts'

export class InitializeMiddleware {
    public static async InitializeCommonMiddleware(app: Express) {
        const commonMiddleware = new CommonMiddleware(app)

        await commonMiddleware.useExpressJson()
        await commonMiddleware.useCookieParser()
        await commonMiddleware.useCors()
    }

    public static async InitializeErrorHandlingMiddleware(app: Express) {
        const errorHandlingMiddleware = new ErrorHandlingMiddleware(app)

        await errorHandlingMiddleware.errorHandler()
    }
}
