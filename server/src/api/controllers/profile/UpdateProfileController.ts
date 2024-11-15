import { NextFunction, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { ProfileModel } from '@/api/models/ProfileModel.ts'

export class UpdateProfileController extends BaseController {
    private service: ProfileService

    constructor() {
        super()
        this.service = new ProfileService()
    }

    protected async executeImplement(req: TypedRequestBody<ProfileModel>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const updatedData = req.body

            if (!Object.keys(updatedData).length) {
                return next(ApiError.BadRequest(StatusConstants.DATA_NOT_FOUND_MSG))
            }

            if (!userId) {
                return next(ApiError.BadRequest(StatusConstants.UNAUTHORIZED_MSG))
            }

            const profile = await this.service.getProfileByUserId(userId)

            if (!profile) {
                return next(ApiError.NotFound(StatusConstants.PROFILE_NOT_FOUND_MSG))
            }

            const result = await this.service.updateProfile(updatedData, userId)

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
