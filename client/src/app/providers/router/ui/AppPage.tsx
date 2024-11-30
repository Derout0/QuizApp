import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'

export const AppPage = () => {
    return (
        <div className="Page">
            <Suspense fallback={<PageLoader />}>
                <div className="Container">
                    <Outlet />
                </div>
            </Suspense>
        </div>
    )
}
