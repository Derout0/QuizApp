import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export class CommonMiddleware {
    app: Express

    constructor(_app: Express) {
        this.app = _app
    }

    public async useExpressJson() {
        this.app.use(express.json())
    }

    public async useCors() {
        this.app.use(cors())
    }

    public async useCookieParser() {
        this.app.use(cookieParser())
    }
}
