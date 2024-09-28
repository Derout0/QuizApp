import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { GetProfileByUserIdRoute } from './routes/GetProfileByUserIdRoute.ts'
import { UpdateProfileRoute } from './routes/UpdateProfileRoute.ts'

export const ProfileRoutes: BaseRoute[] = [
    new GetProfileByUserIdRoute(),
    new UpdateProfileRoute(),
]
