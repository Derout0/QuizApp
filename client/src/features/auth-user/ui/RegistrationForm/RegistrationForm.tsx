import * as cls from './RegistrationForm.module.scss'
import { type FormEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useAuth } from '@/features/auth-user'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { useAppDispatch } from '@/shared/lib/hooks'
import { AsyncReducerLoader, type ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'

import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice'

import {
    getRegistrationEmail, getRegistrationIsLoading,
    getRegistrationPassword,
    getRegistrationUsername,
} from '../../model/selectors/getRegistrationSelectors'

interface RegistrationFormProps {
    className?: string
    onClose: () => void
    onSuccess: () => void
}

const reducers: ReducersList = {
    registrationForm: registrationReducer,
}

const RegistrationForm = (props: RegistrationFormProps) => {
    const {
        className,
        onClose,
        onSuccess,
    } = props

    const dispatch = useAppDispatch()
    const { signUp } = useAuth()

    const username = useSelector(getRegistrationUsername)
    const email = useSelector(getRegistrationEmail)
    const password = useSelector(getRegistrationPassword)
    const isLoading = useSelector(getRegistrationIsLoading)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registrationActions.setUsername(value))
    }, [dispatch])

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registrationActions.setEmail(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword(value))
    }, [dispatch])

    const onFormSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()

        const result = await signUp({ username, email, password })

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [signUp, username, email, password, onSuccess])

    return (
        <AsyncReducerLoader reducers={reducers}>
            <form onSubmit={onFormSubmit} className={classNames(cls.RegistrationForm, {}, [className])}>
                <VStack gap="20">
                    <Input
                        theme="filled"
                        value={username}
                        onChange={onChangeUsername}
                        placeholder="Введите username"
                        label="Username"
                    />
                    <Input
                        theme="filled"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Введите email"
                        label="Email"
                    />
                    <Input
                        theme="filled"
                        value={password}
                        onChange={onChangePassword}
                        type="password"
                        placeholder="Введите пароль"
                        label="Password"
                        autoComplete="off"
                    />
                </VStack>
                <HStack gap="12" justify="end">
                    <Button onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                    <Button type="submit" theme="filled" color="primary" loading={isLoading}>Зарегистрироваться</Button>
                </HStack>
            </form>
        </AsyncReducerLoader>
    )
}

export default RegistrationForm
