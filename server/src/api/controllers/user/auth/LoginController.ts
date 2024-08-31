import { NextFunction, Response } from 'express'
import { TypedRequestBody } from '@/api/types/types.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { UserService } from '@/api/services/UserService.ts'

export class LoginController extends BaseController {
    private userService: UserService

    constructor() {
        super()
        this.userService = new UserService()
    }

    protected async executeImplement(req: TypedRequestBody<{ email: string, password: string }>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await this.userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return this.ok(res, userData)
        }
        catch (error: any) {
            next(error)
        }
    }
}
