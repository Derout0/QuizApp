import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/lib/hooks'

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
        </div>
    )
}

export default MainPage
