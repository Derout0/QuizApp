import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { GetProfileByUserIdRoute } from '@/api/routes/profile/GetProfileByUserIdRoute.ts'

export const ProfileRoutes: BaseRoute[] = [
    new GetProfileByUserIdRoute(),
]
