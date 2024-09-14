import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
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
            justify="end"
            align="center"
            gap="20"
        >
            <HStack gap="20" align="end">
                <Button theme="filled" onClick={() => dispatch(logoutService())}>Выйти</Button>
                <Avatar />
            </HStack>
        </HStack>
    )
}
