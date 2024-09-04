import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as process from 'node:process'

export class CommonMiddleware {
    app: Express

    constructor(_app: Express) {
        this.app = _app
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
}
