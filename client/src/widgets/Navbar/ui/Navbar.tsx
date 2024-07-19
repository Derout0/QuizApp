import * as cls from './Navbar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { getRouteMain } from '@/shared/consts/router'
import { Icon } from '@/shared/ui/Icon/Icon'
import { ReactComponent as Logo } from '@/shared/assets/Logo.svg'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const {
        className,
    } = props

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="8" align="center" justify="space-between" maxWidth>
                <AppLink to={getRouteMain()}>
                    <Icon SVG={Logo} />
                </AppLink>
                <Avatar />
            </HStack>
        </header>
    )
}
