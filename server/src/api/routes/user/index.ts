import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { GetAllUsersRoute } from '@/api/routes/user/GetAllUsersRoute.ts'

export const UserRoutes: BaseRoute[] = [
    new GetAllUsersRoute(),
]
