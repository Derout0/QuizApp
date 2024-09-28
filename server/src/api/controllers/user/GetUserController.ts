import { NextFunction, Response, Request } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { UserService } from '@/api/services/UserService.ts'
import { UserDTO } from '@/api/dtos/UserDTO.ts'

export class GetUserController extends BaseController {
    private service: UserService

    constructor() {
        super()
        this.service = new UserService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user

            if (!userId) {
                return next(ApiError.BadRequest(StatusConstants.UNAUTHORIZED_MSG))
            }

            const result = await this.service.getUserByUserId(userId)

            if (!result) {
                return next(ApiError.NotFound(StatusConstants.USER_NOT_FOUND_MSG))
            }

            const userDTO = new UserDTO(result)

            return this.ok(res, userDTO)
        }
        catch (error: any) {
            next(error)
        }
    }
}
