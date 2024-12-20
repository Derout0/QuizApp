import { NextFunction, Request, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'
import { ApiError } from '@/api/utils/ApiError.js'
import { FileService } from '@/api/services/FileService.js'
import path from 'path'
import * as fs from 'node:fs'
import { PUBLIC_PATH, UPLOADS_AVATAR_PATH } from '@/api/constants/paths.ts'

export class UploadAvatarController extends BaseController {
    private profileService: ProfileService
    private fileService: FileService

    constructor() {
        super()
        this.profileService = new ProfileService()
        this.fileService = new FileService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const file = req.file

            if (!file) {
                return next(ApiError.BadRequest('No file uploaded!'))
            }

            const existingProfile = await this.profileService.getProfileByUserId(userId)

            // Удаление существующего изображения
            if (existingProfile && existingProfile.avatarUrl) {
                const existingAvatarPath = path.join(PUBLIC_PATH, existingProfile.avatarUrl)

                // Удаляться должны только загружаемые (UPLOADS_AVATAR_PATH) аватарки
                if (fs.existsSync(existingAvatarPath) && existingProfile.avatarUrl.startsWith(UPLOADS_AVATAR_PATH)) {
                    fs.unlinkSync(existingAvatarPath)
                }
            }

            const avatarURL = await this.fileService.getAvatarURL(file)
            const { avatarUrl } = await this.profileService.updateProfile({ avatarUrl: avatarURL }, userId)

            return this.ok(res, avatarUrl)
        }
        catch (error: any) {
            next(error)
        }
    }
}
