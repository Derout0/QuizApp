import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { GameProgressService } from '@/api/services/GameProgressService.ts'
import { UpdateGameProgressModel } from '@/api/models/GameProgressModel.ts'
import { GameTypes } from '@/api/constants/GameTypes.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

export class UpdateModuleProgressController extends BaseController {
    private gameProgressService: GameProgressService

    constructor() {
        super()
        this.gameProgressService = new GameProgressService()
    }

    protected async executeImplement(req: TypedRequestBody<UpdateGameProgressModel>, res: Response, next: NextFunction) {
        const { userId } = res.locals.user
        const { moduleId } = req.params
        const updateData = req.body

        if (!updateData) {
            next(ApiError.BadRequest(StatusConstants.BAD_REQUEST_MSG))
        }

        try {
            const gameProgress = await this.gameProgressService.updateGameProgress(userId, moduleId, updateData)

            return this.ok(res, gameProgress)
        }

        catch (error: any) {
            next(error)
        }
    }
}
