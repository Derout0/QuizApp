import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestQuery } from '@/api/types/types.ts'
import { GameProgressService } from '@/api/services/GameProgressService.ts'
import { GameTypes } from '@/api/constants/GameTypes.ts'

export class GetModuleProgressController extends BaseController {
    private gameProgressService: GameProgressService

    constructor() {
        super()
        this.gameProgressService = new GameProgressService()
    }

    protected async executeImplement(req: TypedRequestQuery<{ game: GameTypes }>, res: Response, next: NextFunction) {
        const { userId } = res.locals.user
        const { game } = req.query
        const { moduleId } = req.params

        try {
            const gameProgress = this.gameProgressService.getGameProgress(userId, moduleId, game)

            return this.ok(res, gameProgress)
        }

        catch (error: any) {
            next(error)
        }
    }
}
