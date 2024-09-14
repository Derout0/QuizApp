import { Express } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { UserRoutes } from '@/api/routes/user'
import { AuthRoutes } from '@/api/routes/auth'
import { ProfileRoutes } from '@/api/routes/profile'

export class InitializeRoutes {
    public static async Initialize(app: Express) {
        const routes = await this.getRoutes()
        routes.forEach((routeController) => {
            app.use('/api', routeController.router)
        })
    }

    public static async getRoutes(): Promise<BaseRoute[]> {
        const routes: BaseRoute[] = []
        routes.push(
            ...AuthRoutes,
            ...UserRoutes,
            ...ProfileRoutes,
        )

        return Promise.resolve(routes)
    }
}
