import { classNames } from '@/shared/lib/classNames/classNames'
import { useCallback, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { getRouteMain } from '@/shared/consts/router'
import { Icon } from '@/shared/ui/Icon/Icon'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import Logo from '@/shared/assets/Logo.svg'
import { AuthFormTabId, AuthModal } from '@/features/auth-user'
import { useModal } from '@/shared/lib/hooks'

interface UnauthorizedNavbarProps {
    className?: string
}

export const UnauthorizedNavbar = (props: UnauthorizedNavbarProps) => {
    const {
        className,
    } = props

    const [defaultTab, setDefaultTab] = useState<AuthFormTabId>(AuthFormTabId.SIGN_IN)
    const { visible, close, open } = useModal()

    const onSignIn = useCallback(() => {
        setDefaultTab(AuthFormTabId.SIGN_IN)
        open()
    }, [open])

    const onSignUp = useCallback(() => {
        setDefaultTab(AuthFormTabId.SIGN_UP)
        open()
    }, [open])

    return (
        <HStack
            className={classNames('', {}, [className])}
            maxWidth
            justify="space-between"
            align="center"
            gap="20"
        >
            <AppLink to={getRouteMain()}>
                <Icon SVG={Logo} />
            </AppLink>
            <HStack gap="20" align="center">
                <Button theme="filled" onClick={onSignIn}>Войти</Button>
                <Button theme="outlined" onClick={onSignUp}>Зарегистрироваться</Button>
                <AuthModal isOpen={visible} onClose={close} defaultTabId={defaultTab} />
            </HStack>
        </HStack>
    )
}
