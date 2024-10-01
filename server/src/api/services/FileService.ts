import { AVATAR_URL } from '@/api/constants/paths.js'

export class FileService {
    async getAvatarURL(file: Express.Multer.File): Promise<string> {
        return `${AVATAR_URL}/${file.filename}`
    }
}
