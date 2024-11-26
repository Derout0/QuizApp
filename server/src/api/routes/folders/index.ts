import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { CreateFolderRoute } from '@/api/routes/folders/routes/CreateFolderRoute.ts'

export const FoldersRoutes: BaseRoute[] = [
    new CreateFolderRoute(),
]
