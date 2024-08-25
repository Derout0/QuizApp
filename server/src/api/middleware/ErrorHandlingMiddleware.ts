import { Express, NextFunction, Request, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.js'
import { ApiError } from '@/api/utils/ApiError.js'

export class ErrorHandlingMiddleware {
    app: Express

    constructor(_app: Express) {
        this.app = _app
    }

    public async errorHandler() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ApiError) {
                return res.status(err.status).json({ message: err.message, errors: err.errors })
            }

            return res.status(StatusConstants.INTERNAL_SERVER_ERROR_CODE)
                .json({ message: StatusConstants.INTERNAL_SERVER_ERROR_MSG })
        })
    }
}
