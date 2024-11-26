import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { CreateModuleRoute } from '@/api/routes/modules/routes/CreateModuleRoute.ts'
import { GetUserModulesRoute } from '@/api/routes/modules/routes/GetUserModulesRoute.ts'
import { DeleteModuleRoute } from '@/api/routes/modules/routes/DeleteModuleRoute.ts'
import { UpdateModuleRoute } from '@/api/routes/modules/routes/UpdateModuleRoute.ts'

export const ModulesRoutes: BaseRoute[] = [
    new CreateModuleRoute(),
    new GetUserModulesRoute(),
    new UpdateModuleRoute(),
    new DeleteModuleRoute(),
]
