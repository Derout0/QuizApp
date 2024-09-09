import * as cls from './LoginForm.module.scss'

import { useSelector } from 'react-redux'
import type { FormEvent } from 'react'
import { useCallback } from 'react'

import { getLoginEmail, getLoginIsLoading, getLoginPassword } from '../../model/selectors/getLoginSelectors'
import { loginActions } from '../../model/slice/loginSlice'
import { loginService } from '../../model/services/login/loginService'

import { useAppDispatch } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'

interface LoginFormProps {
    className?: string
    onClose: () => void
}

const LoginForm = (props: LoginFormProps) => {
    const {
        className,
        onClose,
    } = props

    const dispatch = useAppDispatch()

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

        dispatch(loginService({ email, password }))
    }, [dispatch, email, password])

    return (
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
    )
}

export default LoginForm
