import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Input } from '@/shared/ui/Input/Input'
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
