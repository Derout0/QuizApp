import * as cls from './ProfileCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import type { ProfileEntity } from '../../model/types/profile'
import { ProfileCardInfo } from '../ProfileCardInfo/ProfileCardInfo'

interface ProfileCardProps {
    className?: string
    profileData: Partial<ProfileEntity>
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        profileData,
    } = props

    return (
        <VStack gap="20" className={classNames(cls.ProfileCard, {}, [className])}>
            <Text.H4>О пользователе</Text.H4>
            <VStack className={cls.body} gap="12">
                <ProfileCardInfo profileData={profileData} />
            </VStack>
        </VStack>
    )
}
