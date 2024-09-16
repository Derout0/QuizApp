import * as cls from './ProfileCardInfo.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import type { ProfileEntity } from '@/entities/profile'
import { useCallback } from 'react'
import { ProfileCardField } from '../ProfileCardField/ProfileCardField'

interface ProfileInformationProps {
    className?: string
    profileData: Partial<ProfileEntity>
}

interface ProfileField {
    title: string
    arg: keyof ProfileEntity
    solo?: boolean
}

const fields: ProfileField[] = [
    {
        title: 'Имя:',
        arg: 'firstName',
    },
    {
        title: 'Фамилия:',
        arg: 'lastName',
    },
    {
        title: 'Возраст:',
        arg: 'age',
    },
    {
        title: 'Страна:',
        arg: 'country',
    },
]

export const ProfileCardInfo = (props: ProfileInformationProps) => {
    const {
        className,
        profileData,
    } = props

    const isEmptyValue = (value: any) => value === undefined || value === null || value === ''
    const hasInformation = fields.some(field => !isEmptyValue(profileData[field.arg]))

    const getFields = useCallback(() => {
        return fields.map(({ title, arg }) => {
            const value = profileData[arg]

            if (value) {
                return (
                    <ProfileCardField key={title} title={title} argument={value} />
                )
            }
        })
    }, [profileData])

    const renderBaseInformation = useCallback(() => {
        if (!hasInformation) {
            return (
                <HStack className={cls.empty} flexGrow={1} justify="center">
                    <Text sx={{ fontWeight: '600', color: 'on-surface-variant', size: 's' }}>
                        Пользователь еще не указал о себе ничего
                    </Text>
                </HStack>
            )
        }

        return getFields()
    }, [getFields, hasInformation])

    const renderAboutInformation = useCallback(() => {
        const value = profileData['about']

        if (value) {
            return (
                <ProfileCardField title="Обо мне:" argument={value} />
            )
        }
    }, [profileData])

    return (
        <VStack gap="12" className={classNames('', {}, [className])}>
            {renderAboutInformation()}
            <HStack gap="12" align="center" flexWrap="wrap">
                {renderBaseInformation()}
            </HStack>
        </VStack>
    )
}
