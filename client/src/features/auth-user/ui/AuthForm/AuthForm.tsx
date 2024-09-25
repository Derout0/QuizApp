import { memo, Suspense } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import type { TabData } from '@/shared/ui/Tabs/Tabs'
import { Tabs } from '@/shared/ui/Tabs/Tabs'
import { Text } from '@/shared/ui/Text/Text'
import { HStack, VStack } from '@/shared/ui/Stack'

import { AuthFormTabId } from '../../model/types/tabs'
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async'
import { RegistartionFormAsync as RegistrationForm } from '../RegistrationForm/RegistartionForm.async'

import { Loader } from '@/shared/ui/Loader/Loader'

interface AuthFormProps {
    className?: string
    onClose: () => void
    onSuccess: () => void
    defaultTabId?: AuthFormTabId
}

export const AuthForm = memo((props: AuthFormProps) => {
    const {
        className,
        onClose,
        onSuccess,
        defaultTabId,
    } = props

    const tabsData: TabData[] = [
        {
            id: AuthFormTabId.SIGN_IN,
            name: 'Войти',
            element: (
                <Suspense fallback={<Loader position="center" />}>
                    <LoginForm onClose={onClose} onSuccess={onSuccess} />
                </Suspense>
            ),
        },
        {
            id: AuthFormTabId.SIGN_UP,
            name: 'Регистрация',
            element: (
                <Suspense fallback={<Loader position="center" />}>
                    <RegistrationForm onClose={onClose} onSuccess={onSuccess} />
                </Suspense>
            ),
        },
    ]

    return (
        <VStack gap="20" className={classNames('', {}, [className])}>
            <HStack justify="center">
                <Text sx={{ fontSize: 'headline-m', fontWeight: '600' }} align="center">Авторизация в сервисе</Text>
            </HStack>
            <Tabs tabsData={tabsData} defaultTabId={defaultTabId} />
        </VStack>
    )
})
