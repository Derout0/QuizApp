import { memo, Suspense, useCallback } from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'
import { routeConfig } from '../config/routeConfig'

const AppRouter = () => {
    const renderRoute = useCallback((route: RouteProps) => {
        const { element, path } = route

        const elementWrapper = (
            <Suspense fallback={<PageLoader />}>
                <div className="Page">
                    <div className="Container">
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
        <Routes>
            {Object.values(routeConfig).map(renderRoute)}
        </Routes>
    )
}

export default memo(AppRouter)
