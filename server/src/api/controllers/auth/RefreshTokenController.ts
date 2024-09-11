import { BaseController } from '@/api/controllers/BaseController.ts'
import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@/api/services/AuthService.ts'

export class RefreshTokenController extends BaseController {
    private authService: AuthService

    constructor() {
        super()
        this.authService = new AuthService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const userData = await this.authService.refresh(refreshToken)

            res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return this.ok(res, userData)
        }
        catch (error) {
            next(error)
        }
    }
}
