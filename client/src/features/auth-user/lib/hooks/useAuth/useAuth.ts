import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import {
    getUserAuthorized,
    getUserData,
    getUserError,
    getUserInited,
    getUserIsLoading,
} from '@/entities/user'
import { loginService, logoutService, registrationService } from '@/features/auth-user'

import { useAppDispatch } from '@/shared/lib/hooks'

import type { LoginRequest } from '../../../model/services/login/loginService'
import type { RegistrationRequest } from '../../../model/services/registration/registrationService'

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const authorized = useSelector(getUserAuthorized)
    const inited = useSelector(getUserInited)
    const user = useSelector(getUserData)
    const loading = useSelector(getUserIsLoading)
    const error = useSelector(getUserError)

    const signIn = useCallback(async (credentials: LoginRequest) => {
        return await dispatch(loginService(credentials))
    }, [dispatch])

    const signUp = useCallback(async (credentials: RegistrationRequest) => {
        return await dispatch(registrationService(credentials))
    }, [dispatch])

    const signOut = useCallback(async () => {
        return await dispatch(logoutService())
    }, [dispatch])

    return {
        authorized,
        inited,
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
    }
}
