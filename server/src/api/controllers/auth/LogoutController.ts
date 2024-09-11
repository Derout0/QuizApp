import { BaseController } from '@/api/controllers/BaseController.ts'
import { NextFunction, Response, Request } from 'express'
import { AuthService } from '@/api/services/AuthService.ts'

export class LogoutController extends BaseController {
    private authService: AuthService

    constructor() {
        super()
        this.authService = new AuthService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const token = await this.authService.logout(refreshToken)

            res.clearCookie('refreshToken')
            this.ok(res, token)
        }
        catch (error) {
            next(error)
        }
    }
}
