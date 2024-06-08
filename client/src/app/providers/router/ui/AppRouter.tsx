import { memo, Suspense, useCallback } from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'

import { routeConfig } from '../config/routeConfig'

const AppRouter = () => {
    const renderRoute = useCallback((route: RouteProps) => {
        const { element, path } = route

        const elementWrapper = (
            <Suspense fallback="Load...">
                <div className="page">
                    <div className="container">
                        {element}
                    </div>
                </div>
            </Suspense>
        )

        return (
            <Route
                key={path}
                path={path}
                element={elementWrapper}
            />
        )
    }, [])

    return (
        <Suspense fallback="Load...">
            <Routes>
                {Object.values(routeConfig).map(renderRoute)}
            </Routes>
        </Suspense>
    )
}

export default memo(AppRouter)
