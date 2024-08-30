import { classNames } from '@/shared/lib/classNames/classNames'
import { RegistrationForm } from '@/features/auth-user/ui/RegistrationForm/RegistrationForm'
import { LoginForm } from '@/features/auth-user/ui/LoginForm/LoginForm'
import type { TabData } from '@/shared/ui/Tabs/Tabs'
import { Tabs } from '@/shared/ui/Tabs/Tabs'
import { Text } from '@/shared/ui/Text/Text'
import { Button } from '@/shared/ui/Button/Button'
import { HStack, VStack } from '@/shared/ui/Stack'

interface AuthFormProps {
    className?: string
    onClose: () => void
}

export const AuthForm = (props: AuthFormProps) => {
    const {
        className,
        onClose,
    } = props

    const tabsData: TabData[] = [
        {
            name: 'Войти',
            element: <LoginForm onClose={onClose} />,
        },
        {
            name: 'Регистрация',
            element: <RegistrationForm onClose={onClose} />,
        },
    ]

    return (
        <VStack gap="20" className={classNames('', {}, [className])}>
            <HStack justify="center">
                <Text.H1 sx={{ fontWeight: '500' }} align="center">Авторизация в сервисе</Text.H1>
            </HStack>
            <Tabs tabsData={tabsData} />
        </VStack>
    )
}
