import * as cls from './RegistrationForm.module.scss'
import { type FormEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { useAppDispatch } from '@/shared/lib/hooks'

import { registrationActions } from '../../model/slice/registrationSlice'
import { registrationService } from '../../model/services/registration/registrationService'
import {
    getRegistrationEmail, getRegistrationIsLoading,
    getRegistrationPassword,
    getRegistrationUsername,
} from '../../model/selectors/getRegistrationSelectors'

interface RegistrationFormProps {
    className?: string
    onClose: () => void
}

const RegistrationForm = (props: RegistrationFormProps) => {
    const {
        className,
        onClose,
    } = props

    const username = useSelector(getRegistrationUsername)
    const email = useSelector(getRegistrationEmail)
    const password = useSelector(getRegistrationPassword)
    const isLoading = useSelector(getRegistrationIsLoading)

    const dispatch = useAppDispatch()

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

        dispatch(registrationService({ username, email, password }))
    }, [dispatch, username, email, password])

    return (
        <form onSubmit={onFormSubmit} className={classNames(cls.RegistrationForm, {}, [className])}>
            <VStack gap="20">
                <Input value={username} onChange={onChangeUsername} placeholder="Введите username" label="Username" />
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
                <Button onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                <Button type="submit" theme="filled" color="primary" loading={isLoading}>Зарегистрироваться</Button>
            </HStack>
        </form>
    )
}

export default RegistrationForm
