import * as cls from './SettingsPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { UpdateForm } from '@/features/update-settings'

interface SettingsPageProps {
    className?: string
}

const SettingsPage = (props: SettingsPageProps) => {
    const {
        className,
    } = props

    return (
        <div className={classNames(cls.SettingsPage, {}, [className])}>
            <UpdateForm />
        </div>
    )
}

export default SettingsPage
