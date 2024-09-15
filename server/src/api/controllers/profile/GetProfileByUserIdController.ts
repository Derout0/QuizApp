import { NextFunction, Request, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

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
                return next(ApiError.BadRequest('ID not found!'))
            }

            const profile = await this.service.getProfileByUserId(id)

            if (!profile) {
                return next(ApiError.NotFound('Profile not found!'))
            }

            this.ok(res, profile)
        }
        catch (error: any) {
            next(error)
        }
    }
}
