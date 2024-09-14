import * as cls from './ProfilePage.module.scss'
import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { AsyncReducerLoader, type ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'

import { profileReducer } from '@/entities/profile'

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props

    return (
        <AsyncReducerLoader reducers={reducers}>
            <div className={classNames(cls.ProfilePage, {}, [className])}>

            </div>
        </AsyncReducerLoader>
    )
})

export default ProfilePage
