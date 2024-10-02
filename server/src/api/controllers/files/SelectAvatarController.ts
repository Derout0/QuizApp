import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'

export class SelectAvatarController extends BaseController {
    private profileService: ProfileService

    constructor() {
        super()
        this.profileService = new ProfileService()
    }

    protected async executeImplement(req: TypedRequestBody<{ avatarUrl: string }>, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userId } = res.locals.user
            const { avatarUrl } = req.body

            if (!avatarUrl) {
                next(ApiError.BadRequest('Avatar URL is not found!'))
            }

            const result = await this.profileService.updateProfile({ avatarUrl: avatarUrl }, userId)

            this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
