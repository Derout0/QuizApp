import { useAuth } from '@/features/auth-user'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Button } from '@/shared/ui/Button/Button'

interface AuthorizedNavbarProps {
    className?: string
}

export const AuthorizedNavbar = (props: AuthorizedNavbarProps) => {
    const {
        className,
    } = props

    const { signOut } = useAuth()

    return (
        <HStack
            className={classNames('', {}, [className])}
            maxWidth
            justify="end"
            align="center"
            gap="20"
        >
            <HStack gap="20" align="end">
                <Button theme="filled" onClick={() => signOut()}>Выйти</Button>
                <Avatar />
            </HStack>
        </HStack>
    )
}
