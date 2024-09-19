import { NextFunction, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { UserService } from '@/api/services/UserService.ts'
import { UserModel } from '@/api/models/UserModel.ts'

export class UpdateUserController extends BaseController {
    private service: UserService

    constructor() {
        super()
        this.service = new UserService()
    }

    protected async executeImplement(req: TypedRequestBody<UserModel>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const updatedData = req.body

            if (!Object.keys(updatedData).length) {
                return next(ApiError.BadRequest(StatusConstants.DATA_NOT_FOUND_MSG))
            }

            if (!userId) {
                return next(ApiError.BadRequest(StatusConstants.UNAUTHORIZED_MSG))
            }

            if (updatedData.password) {
                updatedData.password = await this.service.encryptPassword(updatedData.password)
            }

            const result = await this.service.updateUser(updatedData, userId)

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
