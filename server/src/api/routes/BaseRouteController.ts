import express, { Request, Response } from 'express'

export class BaseRouteController {
    router = express.Router()
    path!: string

    public async InitializeController() {
        await this.InitializeRoutes()
    }

    private async InitializeRoutes() {
        await this.InitializeGet()
        await this.InitializePost()
        await this.InitializePut()
        await this.InitializeDelete()
    }

    public async startService(req: Request, resp: Response): Promise<any> {
        resp.send('Start Service Method for ' + this.path + 'does not exist !')
    }

    // CRUD methods
    public async InitializeGet() {
        this.router.get(this.path, this.startService.bind(this))
    }

    public async InitializePost() {
        this.router.post(this.path, this.startService.bind(this))
    }

    public async InitializePut() {
        this.router.put(this.path, this.startService.bind(this))
    }

    public async InitializeDelete() {
        this.router.delete(this.path, this.startService.bind(this))
    }
}
