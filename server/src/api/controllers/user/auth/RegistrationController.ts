import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import { BaseController } from '@/api/controllers/BaseController.js'
import { TypedRequestBody } from '@/api/types/types.js'
import { UserService } from '@/api/services/UserService.js'
import { ApiError } from '@/api/utils/ApiError.ts'

export class RegistrationController extends BaseController {
    private userService: UserService

    constructor() {
        super()
        this.userService = new UserService()
    }

    protected async executeImplement(req: TypedRequestBody<{ email: string, password: string, username: string }>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation failed', errors.array()))
            }

            const { email, password, username } = req.body
            const userData = await this.userService.registration(email, password, username)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

            return this.ok(res, userData)
        }
        catch (error: any) {
            next(error)
        }
    }
}
