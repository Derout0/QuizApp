import Root from '@/Root'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { LibraryPage, ModulesPage } from '@/pages/LibraryPage'
import { ModuleDetailsPage } from '@/pages/ModuleDetailsPage'

import { AppRoutes } from '@/shared/consts/router'
import type { AppRouteObject } from '@/shared/types/router'

export const routes: AppRouteObject[] = [
    {
        path: AppRoutes.MAIN,
        element: <Root />,
        children: [
            {
                index: true,
                path: AppRoutes.MAIN,
                element: <MainPage />,
            },
            {
                path: AppRoutes.PROFILE,
                element: <ProfilePage />,
                auth: true,
            },
            {
                path: AppRoutes.SETTINGS,
                element: <SettingsPage />,
                auth: true,
            },
            {
                path: AppRoutes.LIBRARY.ROOT,
                element: <LibraryPage />,
                auth: true,
                children: [
                    {
                        path: AppRoutes.LIBRARY.MODULES,
                        element: <ModulesPage />,
                    },
                    {
                        path: AppRoutes.LIBRARY.FOLDERS,
                        element: (<div>Папки</div>),
                    },
                ],
            },
            {
                path: AppRoutes.MODULE_DETAIL,
                element: <ModuleDetailsPage />,
            },
        ],
    },
    {
        path: AppRoutes.NOT_FOUND,
        element: <NotFoundPage />,
    },
]
