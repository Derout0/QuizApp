import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { BaseFileUploader } from '@/entities/file-uploader'
import { useAppDispatch } from '@/shared/lib/hooks'
import { uploadAvatar } from '@/features/update-avatar/model/service/uploadAvatar/uploadAvatar'

const MainPage = () => {
    const { t, i18n } = useTranslation('pages/main')
    const dispatch = useAppDispatch()
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div className={classNames('1')}>
            <button onClick={toggle}>Переключить</button>
            {t('Тестовое предложение')}

            <BaseFileUploader api={arg => dispatch(uploadAvatar(arg))} options={{ maxFiles: 5, maxTotalSize: 20 }} />
        </div>
    )
}

export default MainPage
