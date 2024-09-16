import * as cls from './LoginForm.module.scss'

import { useSelector } from 'react-redux'
import type { FormEvent } from 'react'
import { useCallback } from 'react'

import { getLoginEmail, getLoginIsLoading, getLoginPassword } from '../../model/selectors/getLoginSelectors'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginService } from '../../model/services/login/loginService'

import { useAppDispatch } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'

import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { useAuth } from '@/features/auth-user'

interface LoginFormProps {
    className?: string
    onClose: () => void
    onSuccess: () => void
}

const reducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = (props: LoginFormProps) => {
    const {
        className,
        onClose,
        onSuccess,
    } = props

    const dispatch = useAppDispatch()
    const { signIn } = useAuth()

    const email = useSelector(getLoginEmail)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onFormSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()

        const result = await signIn({ email, password })

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [signIn, email, password, onSuccess])

    return (
        <AsyncReducerLoader reducers={reducers}>
            <form onSubmit={onFormSubmit} className={classNames(cls.LoginForm, {}, [className])}>
                <VStack gap="12">
                    <Input value={email} onChange={onChangeEmail} placeholder="Введите email" label="Email" />
                    <Input
                        value={password}
                        onChange={onChangePassword}
                        type="password"
                        placeholder="Введите пароль"
                        label="Password"
                        autoComplete="off"
                    />
                </VStack>
                <HStack gap="12" justify="end">
                    <Button type="button" onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                    <Button type="submit" theme="filled" color="primary" loading={isLoading}>Войти</Button>
                </HStack>
            </form>
        </AsyncReducerLoader>
    )
}

export default LoginForm
