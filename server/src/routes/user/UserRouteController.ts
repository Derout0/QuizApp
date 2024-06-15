import { BaseRouteController } from '@/routes/BaseRouteController.js'
import { Request, Response } from 'express'

export class UserRouteController extends BaseRouteController {
    constructor() {
        super()
        this.path = '/users'
        this.InitializeController()
    }

    public async handleGet(req: Request, resp: Response): Promise<any> {
        // Описать логику
        resp.send('GET request received at ' + this.path)
    }
}
