import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { InitializeRoutes } from '@/api/core/InitializeRoutes.js'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'

export const server = async () => {
    const app: Express = express()
    const PORT = process.env.PORT || 3000

    app.use(express.json())
    app.use(cookieParser())
    app.use(cors())

    await InitializeRoutes.Initialize(app)
    await InitializeMiddleware.InitializeErrorHandlingMiddleware(app)

    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (err) {
        console.log(err)
    }
}
