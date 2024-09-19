import { NextFunction, Request, Response } from 'express'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { validationResult } from 'express-validator'

/**
 * Middleware для обработки ошибок с получаемых запросов (express-validator)
 */

export class ValidationMiddleware {
    public async validate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest(StatusConstants.VALIDATION_ERROR_MSG, errors.array()))
        }

        next()
    }
}
