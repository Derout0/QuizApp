import { Express } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { UserRoutesControllers } from '@/api/routes/user/index.js'

export class InitializeRoutes {
    public static async Initialize(app: Express) {
        const routes = await this.getRoutes()
        routes.forEach((routeController) => {
            app.use('/api', routeController.router)
        })
    }

    public static async getRoutes(): Promise<BaseRoute[]> {
        const routes: BaseRoute[] = []
        routes.push(...UserRoutesControllers)

        return Promise.resolve(routes)
    }
}
