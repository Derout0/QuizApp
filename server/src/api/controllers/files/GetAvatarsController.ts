import { NextFunction, Request, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { FileService } from '@/api/services/FileService.ts'
import * as fs from 'node:fs'
import path from 'path'
import { STATIC_AVATAR_PATH } from '@/api/constants/paths.ts'

export class GetAvatarsController extends BaseController {
    private fileService: FileService

    constructor() {
        super()
        this.fileService = new FileService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const avatars = fs.readdirSync(path.join(__projectRoot, 'public', STATIC_AVATAR_PATH))
            const URLs = avatars.map(avatar => `${STATIC_AVATAR_PATH}/${avatar}`)

            this.ok(res, URLs)
        }
        catch (error: any) {
            next(error)
        }
    }
}
