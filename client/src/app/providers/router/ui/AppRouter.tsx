import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth'
import { PageLoader } from '@/widgets/PageLoader'
import type { AppRouteProps } from '@/shared/types/router'
import { routeConfig } from '../config/routeConfig'

const AppRouter = () => {
    const renderRoute = useCallback((route: AppRouteProps) => {
        const { element, path, auth } = route

        const page = (
            <Suspense fallback={<PageLoader />}>
                <div className="Page">
                    <div className="Container">
                        {element}
                    </div>
                </div>
            </Suspense>
        )

        const el = auth ? <RequireAuth>{page}</RequireAuth> : page

        return (
            <Route
                key={path}
                path={path}
                element={el}
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
