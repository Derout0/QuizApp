import path from 'path'
import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { AuthMiddleware } from '@/api/middleware/AuthMiddleware.js'

export class CommonMiddleware {
    app: Express
    authMiddleware: AuthMiddleware

    constructor(_app: Express) {
        this.app = _app
        this.authMiddleware = new AuthMiddleware()
    }

    public async useExpressJson() {
        this.app.use(express.json())
    }

    public async useCors() {
        this.app.use(cors({
            credentials: true,
            origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
        }))
    }

    public async useCookieParser() {
        this.app.use(cookieParser())
    }

    public async usePublicFiles() {
        this.app.use('/static', express.static(path.join(__projectRoot, 'public/static')),
        )
        this.app.use('/uploads', express.static(path.join(__projectRoot, 'public/uploads')))
    }
}
