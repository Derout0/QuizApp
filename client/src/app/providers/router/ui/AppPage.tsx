import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppPage = () => {
    return (
        <div className="Page">
            <div className="Container">
                <Outlet />
            </div>
        </div>
    )
}
