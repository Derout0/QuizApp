import { NextFunction, Request, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

export class GetProfileByUserIdController extends BaseController {
    private service: ProfileService

    constructor() {
        super()
        this.service = new ProfileService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)

            if (!id) {
                return next(ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG))
            }

            const profile = await this.service.getProfileByUserId(id)

            if (!profile) {
                return next(ApiError.NotFound(StatusConstants.PROFILE_NOT_FOUND_MSG))
            }

            this.ok(res, profile)
        }
        catch (error: any) {
            next(error)
        }
    }
}
