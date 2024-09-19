import { NextFunction, Request, Response } from 'express'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

/**
 * Middleware для валидации передаваемых в запросе ключей с клиентской части
 * @param {string[]} allowedKeys - Массив разрешённых ключей для проверки.
 */

export class ValidationDbKeysMiddleware {
    allowedKeys: string[]

    constructor(allowedKeys: string[]) {
        this.allowedKeys = allowedKeys
    }

    public async validate(req: Request, res: Response, next: NextFunction) {
        const data = req.body

        if (!Object.keys(data).length) {
            return next(ApiError.BadRequest(StatusConstants.DATA_NOT_FOUND_MSG))
        }

        const invalidKeys = Object.keys(data).filter(key => !this.allowedKeys.includes(key))

        if (invalidKeys.length) {
            next(ApiError.BadRequest(`Invalid keys: ${invalidKeys.join(', ')}`))
        }

        next()
    }
}
