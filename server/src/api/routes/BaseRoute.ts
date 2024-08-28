import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import { ValidationChain } from 'express-validator'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class BaseRoute {
    router = express.Router()
    path!: string
    method: HttpMethod = 'GET'
    middlewares: RequestHandler[] = []
    validationChains: ValidationChain[] = []

    public async InitializeController() {
        await this.InitializeRoutes()
    }

    private async InitializeRoutes() {
        switch (this.method) {
            case 'GET':
                await this.InitializeGet()
                break
            case 'POST':
                await this.InitializePost()
                break
            case 'PUT':
                await this.InitializePut()
                break
            case 'DELETE':
                await this.InitializeDelete()
                break
            default:
                await this.InitializeGet()
        }
    }

    public async startService(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.send('Start Service Method for ' + this.path + 'does not exist !')
    }

    // CRUD methods
    public async InitializeGet() {
        this.router.get(this.path, [...this.middlewares, ...this.validationChains], this.startService.bind(this))
    }

    public async InitializePost() {
        this.router.post(this.path, [...this.middlewares, ...this.validationChains], this.startService.bind(this))
    }

    public async InitializePut() {
        this.router.put(this.path, [...this.middlewares, ...this.validationChains], this.startService.bind(this))
    }

    public async InitializeDelete() {
        this.router.delete(this.path, [...this.middlewares, ...this.validationChains], this.startService.bind(this))
    }
}
