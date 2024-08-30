import * as cls from './Navbar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { getRouteMain } from '@/shared/consts/router'
import { Icon } from '@/shared/ui/Icon/Icon'
import { ReactComponent as Logo } from '@/shared/assets/Logo.svg'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Button } from '@/shared/ui/Button/Button'
import { AuthModal } from '@/features/auth-user'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const {
        className,
    } = props

    const { visible, close, open } = useModal()

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="8" align="center" justify="space-between" maxWidth>
                <AppLink to={getRouteMain()}>
                    <Icon SVG={Logo} />
                </AppLink>
                <Button theme="filled" onClick={open}>Войти</Button>
                <Avatar />
                <AuthModal isOpen={visible} onClose={close} />
            </HStack>
        </header>
    )
}
