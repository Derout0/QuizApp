import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { LibraryPage } from '@/pages/LibraryPage'

import { AppRoutes } from '@/shared/consts/router'
import type { AppRouteObject } from '@/shared/types/router'
import Root from '@/Root'

// TODO: Rewrite Readme
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
                        element: (<div>Модули</div>),
                    },
                ],
            },
        ],
    },
    {
        path: AppRoutes.NOT_FOUND,
        element: <NotFoundPage />,
    },
]
