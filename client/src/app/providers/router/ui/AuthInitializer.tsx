import type { ReactNode } from 'react'
import { memo } from 'react'
import { PageLoader } from '@/widgets/PageLoader'
import { useAuth } from '@/features/auth-user'
import { checkAuthorization } from '@/entities/user'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'

const AuthInitializer = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const { inited } = useAuth()

    useEffectOnce(() => {
        dispatch(checkAuthorization())
    })

    if (!inited) {
        return <PageLoader />
    }

    return children
}

export default memo(AuthInitializer)
