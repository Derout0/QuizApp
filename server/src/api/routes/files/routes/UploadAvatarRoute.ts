import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { UploadAvatarController } from '@/api/controllers/files/UploadAvatarController.js'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'

export class UploadAvatarRoute extends BaseRoute {
    private controller: UploadAvatarController

    constructor() {
        super()
        this.path = '/avatar/upload'
        this.method = 'POST'

        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeUploadAvatarMiddleware('avatar'),
        ]
        this.InitializeRouteController()
        this.controller = new UploadAvatarController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
