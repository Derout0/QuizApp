import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { RegistrationRoute } from './RegistrationRoute.js'
import { LoginRoute } from './LoginRoute.ts'
import { LogoutRoute } from './LogoutRouter.ts'
import { RefreshTokenRoute } from './RefreshTokenRoute.ts'

export const AuthRoutes: BaseRoute[] = [
    new RegistrationRoute(),
    new LoginRoute(),
    new LogoutRoute(),
    new RefreshTokenRoute(),
]
