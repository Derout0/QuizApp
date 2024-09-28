import { BaseRoute } from '@/api/routes/BaseRoute.js'
import { RegistrationRoute } from './routes/RegistrationRoute.ts'
import { LoginRoute } from './routes/LoginRoute.ts'
import { LogoutRoute } from './routes/LogoutRouter.ts'
import { RefreshTokenRoute } from './routes/RefreshTokenRoute.ts'

export const AuthRoutes: BaseRoute[] = [
    new RegistrationRoute(),
    new LoginRoute(),
    new LogoutRoute(),
    new RefreshTokenRoute(),
]
