import { UPLOADS_AVATAR_PATH } from '@/api/constants/paths.js'

export class FileService {
    async getAvatarURL(file: Express.Multer.File): Promise<string> {
        return `${UPLOADS_AVATAR_PATH}/${file.filename}`
    }
}
