import * as cls from './SettingsPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { UpdateForm } from '@/features/update-settings'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'

interface SettingsPageProps {
    className?: string
}

const SettingsPage = (props: SettingsPageProps) => {
    const {
        className,
    } = props

    return (
        <VStack gap="40" className={classNames(cls.SettingsPage, {}, [className])}>
            <Text.HeadlineH1>Настройки</Text.HeadlineH1>
            <UpdateForm />
        </VStack>
    )
}

export default SettingsPage
