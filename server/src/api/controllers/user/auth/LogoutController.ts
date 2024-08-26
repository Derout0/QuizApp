import { BaseController } from '@/api/controllers/BaseController.ts'
import { NextFunction, Response, Request } from 'express'
import { UserService } from '@/api/services/UserService.ts'

export class LogoutController extends BaseController {
    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const token = await UserService.logout(refreshToken)

            res.clearCookie('refreshToken')
            this.ok(res, token)
        }
        catch (error) {
            next(error)
        }
    }
}
