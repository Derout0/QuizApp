import express, { Express } from 'express'
import { InitializeRoutes } from '@/api/core/InitializeRoutes.js'

export const server = async () => {
    const app: Express = express()
    const PORT = process.env.PORT || 3000

    app.use(express.json())
    await InitializeRoutes.Initialize(app)

    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (err) {
        console.log(err)
    }
}
