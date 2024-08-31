import { NextFunction, Request, Response } from 'express'
import { ApiError } from '@/api/utils/ApiError.ts'
import { TokenService } from '@/api/services/TokenService.ts'

export class AuthMiddleware {
    private tokenService: TokenService

    constructor() {
        this.tokenService = new TokenService()
    }

    public async authHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization

            if (!authorizationHeader) {
                return next(ApiError.Unauthorized())
            }

            const accessToken = authorizationHeader.split(' ')[1]

            if (!accessToken) {
                return next(ApiError.Unauthorized())
            }

            const userData = await this.tokenService.validateAccessToken(accessToken)

            if (!userData) {
                return next(ApiError.Unauthorized())
            }

            res.locals.user = userData
            next()
        }
        catch (error) {
            return next(ApiError.Unauthorized())
        }
    }
}
