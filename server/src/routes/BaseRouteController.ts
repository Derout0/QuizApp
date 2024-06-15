import express from 'express'

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

    // Обработчики для каждого типа запросов
    public async handleGet(req: express.Request, resp: express.Response): Promise<any> {
        resp.send('GET method for ' + this.path + ' is not implemented!')
    }

    public async handlePost(req: express.Request, resp: express.Response): Promise<any> {
        resp.send('POST method for ' + this.path + ' is not implemented!')
    }

    public async handlePut(req: express.Request, resp: express.Response): Promise<any> {
        resp.send('PUT method for ' + this.path + ' is not implemented!')
    }

    public async handleDelete(req: express.Request, resp: express.Response): Promise<any> {
        resp.send('DELETE method for ' + this.path + ' is not implemented!')
    }

    public async InitializeGet() {
        this.router.get(this.path, this.handleGet.bind(this))
    }

    // Метод для обработки POST запросов
    public async InitializePost() {
        this.router.post(this.path, this.handlePost.bind(this))
    }

    // Метод для обработки PUT запросов
    public async InitializePut() {
        this.router.put(this.path, this.handlePut.bind(this))
    }

    // Метод для обработки DELETE запросов
    public async InitializeDelete() {
        this.router.delete(this.path, this.handleDelete.bind(this))
    }
}
