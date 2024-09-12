import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { AuthService } from '@/api/services/AuthService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { RequestProfileModel } from '@/api/models/ProfileModel.ts'

export class RegistrationController extends BaseController {
    private authService: AuthService

    constructor() {
        super()
        this.authService = new AuthService()
    }

    protected async executeImplement(
        req: TypedRequestBody<{ email: string, password: string, username: string, profileData?: RequestProfileModel }>,
        res: Response, next: NextFunction,
    ) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation failed', errors.array()))
            }

            const { email, password, username, profileData } = req.body
            const userData = await this.authService.registration(email, password, username, profileData)

            res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

            return this.ok(res, userData)
        }
        catch (error: any) {
            next(error)
        }
    }
}
