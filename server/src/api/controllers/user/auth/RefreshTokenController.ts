import { BaseController } from '@/api/controllers/BaseController.ts'
import { NextFunction, Request, Response } from 'express'
import { UserService } from '@/api/services/UserService.ts'

export class RefreshTokenController extends BaseController {
    private userService: UserService

    constructor() {
        super()
        this.userService = new UserService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const userData = await this.userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return this.ok(res, userData)
        }
        catch (error) {
            next(error)
        }
    }
}
