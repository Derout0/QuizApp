import React, { memo, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth'
import { PageLoader } from '@/widgets/PageLoader'
import type { AppRouteObject } from '@/shared/types/router'
import { routes } from '../config/routeConfig'

const wrapRoutes = (routes: AppRouteObject[]): AppRouteObject[] => {
    return routes.map((route: AppRouteObject) => {
        const { index, element, children, auth } = route

        let wrappedElement = (
            <Suspense fallback={<PageLoader />}>
                {element}
            </Suspense>
        )

        if (auth) {
            wrappedElement = (
                <Suspense fallback={<PageLoader />}>
                    <RequireAuth>
                        {element}
                    </RequireAuth>
                </Suspense>
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
