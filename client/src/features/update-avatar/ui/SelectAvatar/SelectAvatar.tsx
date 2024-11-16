import * as cls from './SelectAvatar.module.scss'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/shared/lib/hooks'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'

import { getUpdateAvatarURLs } from '../../model/selectors/getUpdateAvatarSelectors'
import { selectAvatar } from '../../model/service/selectAvatar/selectAvatar'
import { classNames } from '@/shared/lib/classNames/classNames'

export const SelectAvatar = ({ className }: { className?: string }) => {
    const dispatch = useAppDispatch()
    const avatarsURLs = useSelector(getUpdateAvatarURLs)

    const onSelectAvatar = useCallback((URL: string) => {
        dispatch(selectAvatar(URL))
    }, [dispatch])

    if (!avatarsURLs) return

    const getAvailableAvatars = () => {
        return avatarsURLs.map((URL) => {
            const src = `${__SERVER_URL__}/${URL}`

            return (
                <Avatar
                    as="button"
                    className={cls.avatar}
                    key={URL}
                    onClick={() => onSelectAvatar(URL)}
                    src={src}
                    type="button"
                    size="large"
                />
            )
        })
    }

    return (
        <VStack className={classNames('', {}, [className])} flexGrow={1} gap="8">
            <Text sx={{ fontSize: 'body-s', fontWeight: '500' }}>Доступные:</Text>
            <HStack flexWrap="wrap" gap="8">
                {getAvailableAvatars()}
            </HStack>
        </VStack>
    )
}
