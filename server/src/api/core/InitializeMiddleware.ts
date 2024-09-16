import { Express, RequestHandler } from 'express'
import { ErrorHandlingMiddleware } from '@/api/middleware/ErrorHandlingMiddleware.js'
import { CommonMiddleware } from '@/api/middleware/CommonMiddleware.ts'
import { AuthMiddleware } from '@/api/middleware/AuthMiddleware.ts'
import { ValidateDbKeysMiddleware } from '@/api/middleware/ValidateDbKeysMiddleware.ts'

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

    public static InitializeAuthMiddleware(): RequestHandler {
        const authMiddleware = new AuthMiddleware()

        return authMiddleware.authHandler.bind(authMiddleware)
    }

    public static InitializeValidateDbKeysMiddleware(allowedKeys: string[]): RequestHandler {
        const validateDbKeysMiddleware = new ValidateDbKeysMiddleware(allowedKeys)

        return validateDbKeysMiddleware.validate.bind(validateDbKeysMiddleware)
    }
}
