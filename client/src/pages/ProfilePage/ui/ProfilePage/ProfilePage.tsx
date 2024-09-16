import * as cls from './ProfilePage.module.scss'
import { memo } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { AsyncReducerLoader, type ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'

import { fetchProfileData, getProfileData, getProfileError, ProfileCard, profileReducer } from '@/entities/profile'
import { Text } from '@/shared/ui/Text/Text'

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

// TODO: ERROR HANDLER & COMPONENT
const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const profileData = useSelector(getProfileData)
    const error = useSelector(getProfileError)

    useEffectOnce(() => {
        dispatch(fetchProfileData({ id: 31 }))
    })

    return (
        <AsyncReducerLoader reducers={reducers}>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfileCard profileData={profileData} />
            </div>
        </AsyncReducerLoader>
    )
})

export default ProfilePage
