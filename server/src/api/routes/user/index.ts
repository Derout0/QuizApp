import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { GetAllUsersRoute } from '@/api/routes/user/GetAllUsersRoute.ts'
import { UpdateUserRoute } from '@/api/routes/user/UpdateUserRoute.ts'

export const UserRoutes: BaseRoute[] = [
    new UpdateUserRoute(),
    new GetAllUsersRoute(),
]
