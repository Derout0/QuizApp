import { type FormEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Input } from '@/shared/ui/Input/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'

import { checkPasswordActions, checkPasswordReducer } from '../../model/slice/checkPasswordSlice'
import { getError, getIsLoading, getPassword } from '../../model/selectors/getCheckPasswordSelectors'
import { checkPasswordService } from '@/features/check-password'

interface CheckPasswordFormProps {
    className?: string
    title?: string
    onClose: () => void
    onSuccess: () => void
}

const reducers: ReducersList = {
    checkPasswordForm: checkPasswordReducer,
}

// TODO: useForm hook
export const CheckPasswordForm = (props: CheckPasswordFormProps) => {
    const {
        className,
        title,
        onClose,
        onSuccess,
    } = props

    const dispatch = useAppDispatch()
    const password = useSelector(getPassword)
    const error = useSelector(getError)
    const isLoading = useSelector(getIsLoading)

    const onChangePassword = useCallback((value: string) => {
        dispatch(checkPasswordActions.setPassword(value))
    }, [dispatch])

    const onFormSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        const result = await dispatch(checkPasswordService({ password: password }))

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
            onClose()
        }
    }, [dispatch, password, onSuccess, onClose])

    return (
        <AsyncReducerLoader reducers={reducers}>
            <form onSubmit={onFormSubmit} className={classNames('', {}, [className])}>
                <VStack gap="20">
                    <VStack gap="12">
                        <Text sx={{ fontSize: 'headline-m', fontWeight: '600' }}>{title ? title : 'Изменение данных'}</Text>
                        <Text sx={{ fontSize: 'title-m', fontWeight: '500' }}>Что-бы подтвердить что это вы, введите свой пароль</Text>
                    </VStack>
                    <Input
                        theme="filled"
                        autofocus
                        label="Пароль"
                        type="password"
                        autoComplete="off"
                        value={password}
                        error={error}
                        onChange={onChangePassword}
                    />
                    <HStack gap="20" justify="center">
                        <Button type="button" onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                        <Button type="submit" theme="filled" color="primary" loading={isLoading}>Подтвердить</Button>
                    </HStack>
                </VStack>
            </form>
        </AsyncReducerLoader>
    )
}
