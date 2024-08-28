import express, { Express } from 'express'
import { InitializeRoutes } from '@/api/core/InitializeRoutes.js'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'

export const server = async () => {
    const app: Express = express()
    const PORT = process.env.PORT || 3000

    await InitializeMiddleware.InitializeCommonMiddleware(app)
    await InitializeRoutes.Initialize(app)
    await InitializeMiddleware.InitializeErrorHandlingMiddleware(app)

    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}
