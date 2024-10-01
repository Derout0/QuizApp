import { Express } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { UserRoutes } from '@/api/routes/user/index.ts'
import { AuthRoutes } from '@/api/routes/auth/index.ts'
import { ProfileRoutes } from '@/api/routes/profile/index.ts'
import { FileRoutes } from '@/api/routes/files/index.ts'

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
            ...FileRoutes,
        )

        return Promise.resolve(routes)
    }
}
