import type { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth-user'
import { AppPaths } from '@/shared/consts/router'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { authorized, inited } = useAuth()
    const location = useLocation()

    if (inited && !authorized) {
        return <Navigate to={AppPaths.MAIN} state={{ from: location }} replace />
    }

    return children
}
