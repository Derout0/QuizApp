import * as cls from './UpdateAvatar.module.scss'
import { useSelector } from 'react-redux'

import { getProfileAvatarURL } from '@/entities/profile'

import UploadAvatarIcon from '@/shared/assets/icons/Upload-2.svg'

import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { useAppDispatch, useEffectOnce, useModal } from '@/shared/lib/hooks'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'

import { updateAvatarReducer } from '../../model/slice/updateAvatarSlice'
import { fetchAvatars } from '../../model/service/fetchAvatars/fetchAvatars'
import { UploadAvatarModal } from '../UploadAvatarModal/UploadAvatarModal'
import { SelectAvatar } from '../SelectAvatar/SelectAvatar'

interface UpdateAvatarFormProps {
    className?: string
}

const reducers: ReducersList = {
    updateAvatar: updateAvatarReducer,
}

export const UpdateAvatar = (props: UpdateAvatarFormProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const avatarURL = useSelector(getProfileAvatarURL)
    const { visible, open, close } = useModal()

    useEffectOnce(() => {
        dispatch(fetchAvatars())
    })

    const src = `${__SERVER_URL__}/${avatarURL}`

    return (
        <AsyncReducerLoader reducers={reducers}>
            <VStack gap="20" className={classNames('', {}, [className])}>
                <HStack gap="20" align="center">
                    <VStack className={cls.avatar}>
                        <Avatar src={src} className={cls['selected-avatar']} theme="outlined" />
                        <IconButton theme="tonal" className={cls['select-button']} onClick={open}>
                            <Icon SVG={UploadAvatarIcon} />
                        </IconButton>
                    </VStack>
                    <SelectAvatar />
                </HStack>
                <UploadAvatarModal isOpen={visible} onClose={close} />
            </VStack>
        </AsyncReducerLoader>
    )
}
