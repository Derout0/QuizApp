import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'

const MainPage = () => {
    const { t, i18n } = useTranslation('pages/main')

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
