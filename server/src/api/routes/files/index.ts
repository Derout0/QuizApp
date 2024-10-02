import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { UploadAvatarRoute } from './routes/UploadAvatarRoute.ts'
import { GetAvatarsRoute } from './routes/GetAvatarsRoute.ts'
import { SelectAvatarRoute } from './routes/SelectAvatarRoute.ts'

export const FileRoutes: BaseRoute[] = [
    new UploadAvatarRoute(),
    new GetAvatarsRoute(),
    new SelectAvatarRoute(),
]
