import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { UploadAvatarRoute } from '@/api/routes/files/routes/UploadAvatarRoute.ts'

export const FileRoutes: BaseRoute[] = [
    new UploadAvatarRoute(),
]
