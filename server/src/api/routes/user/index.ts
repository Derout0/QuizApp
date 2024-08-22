import { BaseRouteController } from '@/api/routes/BaseRouteController.js'
import { GetAllUsersRouteController } from '@/api/routes/user/GetAllUsersRouteController.js'

export const UserRoutesControllers: BaseRouteController[] = [
    new GetAllUsersRouteController(),
]
