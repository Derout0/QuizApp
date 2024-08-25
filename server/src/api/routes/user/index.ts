import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { GetAllUsersRoute } from '@/api/routes/user/base/GetAllUsersRoute.js'
import { RegistrationRoute } from '@/api/routes/user/auth/RegistrationRoute.js'

export const UserRoutesControllers: BaseRoute[] = [
    new RegistrationRoute(),
    new GetAllUsersRoute(),
]
