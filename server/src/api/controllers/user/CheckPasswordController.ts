import { NextFunction, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { UserService } from '@/api/services/UserService.ts'

export class CheckPasswordController extends BaseController {
    private service: UserService

    constructor() {
        super()
        this.service = new UserService()
    }

    protected async executeImplement(req: TypedRequestBody<{ password: string }>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const { password } = req.body

            if (!password) {
                return next(ApiError.BadRequest(StatusConstants.DATA_NOT_FOUND_MSG))
            }

            if (!userId) {
                return next(ApiError.BadRequest(StatusConstants.UNAUTHORIZED_MSG))
            }

            const result = await this.service.checkPassword(password, userId)

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
