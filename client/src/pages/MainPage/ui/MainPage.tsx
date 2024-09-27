import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { CheckPasswordModal } from '@/features/check-password/ui/CheckPasswordModal/CheckPasswordModal'

const MainPage = () => {
    const { t, i18n } = useTranslation('pages/main')
    const { visible, close, open } = useModal()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div className={classNames('1')}>
            <button onClick={toggle}>Переключить</button>

            <button onClick={open}>Открыть модалку</button>
            <CheckPasswordModal isOpen={visible} onClose={close} onSuccess={() => console.log('YES')} />

            {t('Тестовое предложение')}
        </div>
    )
}

export default MainPage
