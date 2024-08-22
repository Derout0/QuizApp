import { Express } from 'express'
import { BaseRouteController } from '@/api/routes/BaseRouteController.js'
import { UserRoutesControllers } from '@/api/routes/user/index.js'

export class InitializeRoutes {
    public static async Initialize(app: Express) {
        const routes = await this.getRoutes()
        routes.forEach((routeController) => {
            app.use('/', routeController.router)
        })
    }

    public static async getRoutes(): Promise<BaseRouteController[]> {
        const routes: BaseRouteController[] = []
        routes.push(...UserRoutesControllers)

        return Promise.resolve(routes)
    }
}
