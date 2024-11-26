import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { CreateFolderController } from '@/api/controllers/folders/CreateFolderController.ts'
import { foldersFieldClientKeys } from '@/api/repositories/FolderRepository.ts'

export class CreateFolderRoute extends BaseRoute {
    private controller: CreateFolderController

    constructor() {
        super()
        this.path = '/folders'
        this.method = 'POST'

        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(foldersFieldClientKeys),
        ]
        this.InitializeRouteController()
        this.controller = new CreateFolderController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
