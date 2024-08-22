import { BaseRouteController } from '@/api/routes/BaseRouteController.ts'
import { Request, Response } from 'express'
import { GetAllUsersController } from '@/api/controllers/user/GetAllUsersController.js'

export class GetAllUsersRouteController extends BaseRouteController {
    private controller: GetAllUsersController

    constructor() {
        super()
        this.path = '/users'
        this.InitializeController()
        this.controller = new GetAllUsersController()
    }

    public async startService(req: Request, res: Response): Promise<void> {
        await this.controller.execute(req, res)
    }
}
