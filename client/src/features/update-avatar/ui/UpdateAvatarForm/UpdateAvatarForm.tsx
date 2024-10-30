import * as cls from './UpdateAvatarForm.module.scss'
import { useSelector } from 'react-redux'

import { getProfileAvatarURL } from '@/entities/profile'

import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'

import { updateAvatarReducer } from '../../model/slice/updateAvatarSlice'
import { fetchAvatars } from '../../model/service/fetchAvatars/fetchAvatars'
import { AvailableAvatars } from '../AvailableAvatars/AvailableAvatars'

interface UpdateAvatarFormProps {
    className?: string
}

const reducers: ReducersList = {
    updateAvatar: updateAvatarReducer,
}

export const UpdateAvatarForm = (props: UpdateAvatarFormProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const avatarURL = useSelector(getProfileAvatarURL)

    useEffectOnce(() => {
        dispatch(fetchAvatars())
    })

    const src = `${__SERVER_URL__}/${avatarURL}`

    return (
        <AsyncReducerLoader reducers={reducers}>
            <VStack gap="20" className={classNames('', {}, [className])}>
                <HStack gap="20" align="center">
                    <Avatar src={src} className={cls.selectedAvatar} theme="outlined" />
                    <AvailableAvatars />
                </HStack>
            </VStack>
        </AsyncReducerLoader>
    )
}
