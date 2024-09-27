import * as cls from './SettingsPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { UpdateForm } from '@/features/update-settings'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'
import { fetchProfileData } from '@/entities/profile'
import { useAuth } from '@/features/auth-user'

interface SettingsPageProps {
    className?: string
}

const SettingsPage = (props: SettingsPageProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const { user } = useAuth()

    useEffectOnce(() => {
        if (user?.userId) {
            dispatch(fetchProfileData({ id: user?.userId }))
        }
    })

    return (
        <div className={classNames(cls.SettingsPage, {}, [className])}>
            <UpdateForm />
        </div>
    )
}

export default SettingsPage
