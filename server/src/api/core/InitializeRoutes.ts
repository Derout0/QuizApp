import { Express } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import {
    AuthRoutes,
    FileRoutes,
    FoldersRoutes,
    ModulesRoutes,
    ProfileRoutes,
    UserRoutes,
    GameProgressRoutes,
} from '@/api/routes'

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
            ...FoldersRoutes,
            ...ModulesRoutes,
            ...GameProgressRoutes,
        )

        return Promise.resolve(routes)
    }
}
