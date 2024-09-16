import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { GetProfileByUserIdRoute } from './GetProfileByUserIdRoute.ts'
import { UpdateProfileRoute } from './UpdateProfileRoute.ts'

export const ProfileRoutes: BaseRoute[] = [
    new GetProfileByUserIdRoute(),
    new UpdateProfileRoute(),
]
