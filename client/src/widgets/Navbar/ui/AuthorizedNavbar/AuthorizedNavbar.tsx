import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { getRouteMain } from '@/shared/consts/router'
import { Icon } from '@/shared/ui/Icon/Icon'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import Logo from '@/shared/assets/Logo.svg'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks'
import { logoutService } from '@/features/auth-user'

interface AuthorizedNavbarProps {
    className?: string
}

export const AuthorizedNavbar = (props: AuthorizedNavbarProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()

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
                <Button theme="filled" onClick={() => dispatch(logoutService())}>Выйти</Button>
                <Avatar />
            </HStack>
        </HStack>
    )
}
