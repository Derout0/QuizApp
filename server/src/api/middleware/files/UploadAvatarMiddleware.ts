import path from 'path'
import { BaseUploadMiddleware } from '@/api/middleware/files/BaseUploadMiddleware.js'
import { MimeTypes } from '@/api/constants/MimeTypes.js'

export class UploadAvatarMiddleware extends BaseUploadMiddleware {
    constructor() {
        super(path.join(__projectRoot, '/public/uploads/avatars'), [MimeTypes.JPEG, MimeTypes.PNG], 5)
    }
}
