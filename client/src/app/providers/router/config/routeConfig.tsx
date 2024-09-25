import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'

import { AppRoutes, getRouteMain, getRouteProfile, getRouteSettings } from '@/shared/consts/router'
import type { AppRouteProps } from '@/shared/types/router'

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${getRouteProfile()}/:id`,
        element: <ProfilePage />,
        auth: true,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
        auth: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
}
