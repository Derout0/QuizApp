import { memo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth'
import type { AppRouteObject } from '@/shared/types/router'
import { routes } from '../config/routeConfig'

const wrapRoutes = (routes: AppRouteObject[]): AppRouteObject[] => {
    return routes.map((route: AppRouteObject) => {
        const { index, element, children, auth } = route

        let wrappedElement = element

        if (auth) {
            wrappedElement = (
                <RequireAuth>
                    {element}
                </RequireAuth>
            )
        }

        // Without children (interface IndexRouteObject)
        if (index) return {
            ...route,
            element: wrappedElement,
        }

        return {
            ...route,
            element: wrappedElement,
            children: children ? wrapRoutes(children) : undefined,
        }
    })
}

const AppRouter = () => {
    const router = createBrowserRouter(wrapRoutes(routes))

    return (
        <RouterProvider router={router} />
    )
}

export default memo(AppRouter)
