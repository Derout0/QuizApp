import { Express, RequestHandler } from 'express'
import { ErrorHandlingMiddleware } from '@/api/middleware/ErrorHandlingMiddleware.js'
import { CommonMiddleware } from '@/api/middleware/CommonMiddleware.ts'
import { AuthMiddleware } from '@/api/middleware/AuthMiddleware.ts'
import { ValidationDbKeysMiddleware } from '@/api/middleware/ValidationDbKeysMiddleware.ts'
import { ValidationMiddleware } from '@/api/middleware/ValidationMiddleware.ts'

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

    public static InitializeValidationDbKeysMiddleware(allowedKeys: string[]): RequestHandler {
        const validateDbKeysMiddleware = new ValidationDbKeysMiddleware(allowedKeys)

        return validateDbKeysMiddleware.validate.bind(validateDbKeysMiddleware)
    }

    public static InitializeValidationMiddleware(): RequestHandler {
        const validationMiddleware = new ValidationMiddleware()

        return validationMiddleware.validate.bind(validationMiddleware)
    }
}
