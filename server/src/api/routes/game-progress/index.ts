import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { GetModuleProgressRoute } from '@/api/routes/game-progress/routes/GetModuleProgressRoute.ts'
import { UpdateModuleProgress } from '@/api/routes/game-progress/routes/UpdateModuleProgress.ts'
import { ResetModuleProgressRoute } from '@/api/routes/game-progress/routes/ResetModuleProgressRoute.ts'

export const GameProgressRoutes: BaseRoute[] = [
    new GetModuleProgressRoute(),
    new UpdateModuleProgress(),
    new ResetModuleProgressRoute(),
]
