import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { GetAllUsersRoute } from '@/api/routes/user/base/GetAllUsersRoute.js'
import { RegistrationRoute } from '@/api/routes/user/auth/RegistrationRoute.js'
import { LoginRoute } from '@/api/routes/user/auth/LoginRoute.ts'
import { LogoutRoute } from '@/api/routes/user/auth/LogoutRouter.ts'
import { RefreshTokenRoute } from '@/api/routes/user/auth/RefreshTokenRoute.ts'

export const UserRoutesControllers: BaseRoute[] = [
    new RegistrationRoute(),
    new LoginRoute(),
    new LogoutRoute(),
    new RefreshTokenRoute(),
    new GetAllUsersRoute(),
]
