import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { CheckPasswordModal } from '@/features/check-password/ui/CheckPasswordModal/CheckPasswordModal'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { FileUploader } from '@/entities/file-uploader/ui/FileUploader/FileUploader'
import Settings from '@/shared/assets/icons/Settings.svg'

const api = {
    uploadFile({ timeout = 1500 }) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeout)
        })
    },
}

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
            <IconButton theme="filled">
                <Icon SVG={Settings} />
            </IconButton>
            <IconButton theme="standard">
                <Icon SVG={Settings} />
            </IconButton>
            <IconButton theme="tonal">
                <Icon SVG={Settings} />
            </IconButton>
            <IconButton theme="outlined">
                <Icon SVG={Settings} />
            </IconButton>
            <FileUploader api={api.uploadFile} />
            {t('Тестовое предложение')}
        </div>
    )
}

export default MainPage
