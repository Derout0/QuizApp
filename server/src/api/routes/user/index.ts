import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { GetAllUsersRoute } from './routes/GetAllUsersRoute.ts'
import { UpdateUserRoute } from './routes/UpdateUserRoute.ts'
import { CheckPasswordRoute } from './routes/CheckPasswordRoute.ts'
import { GetUserRoute } from './routes/GetUserRoute.ts'

export const UserRoutes: BaseRoute[] = [
    new GetUserRoute(),
    new GetAllUsersRoute(),
    new UpdateUserRoute(),
    new CheckPasswordRoute(),
]
