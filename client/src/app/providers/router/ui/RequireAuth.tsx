import type { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth-user'
import { AppRoutes } from '@/shared/consts/router'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { authorized, inited } = useAuth()
    const location = useLocation()

    if (inited && !authorized) {
        return <Navigate to={AppRoutes.MAIN} state={{ from: location }} replace />
    }

    return children
}
