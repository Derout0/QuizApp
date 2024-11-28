import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'

export const AppPage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <div className="Page">
                <div className="Container">
                    <Outlet />
                </div>
            </div>
        </Suspense>
    )
}
