import * as cls from './ProfileCardField.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'

interface ProfileCardFieldProps {
    title: string
    argument: string | number
}

export const ProfileCardField = (props: ProfileCardFieldProps) => {
    const {
        title,
        argument,
    } = props

    return (
        <VStack gap="4" className={cls.ProfileCardField}>
            <Text sx={{ color: 'tertiary', fontWeight: '600', size: 'xxs' }}>{title}</Text>
            <Text sx={{ fontWeight: '500', size: 's' }}>{argument}</Text>
        </VStack>
    )
}
