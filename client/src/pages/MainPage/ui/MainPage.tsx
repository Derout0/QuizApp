import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { motion } from 'framer-motion'
import { Modal } from '@/shared/ui/Modal/Modal'

const MainPage = () => {
    const { t, i18n } = useTranslation('pages/main')

    const { visible, close, open } = useModal()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div className={classNames('1')}>
            Main Page
            <motion.div animate={{ x: 100 }}>ТЕСТ</motion.div>
            <button onClick={toggle}>Переключить</button>
            <HStack gap="8">
                <VStack gap="8" align="start">
                    <Button theme="filled" color="primary" size="small">Test Size</Button>
                    <Button theme="filled" color="primary-variant" size="medium">Test Size</Button>
                    <Button theme="filled" color="secondary" size="large">Test Size</Button>
                    <Button theme="filled" color="secondary-variant">Secondary container</Button>
                    <Button theme="filled" color="error">Error</Button>
                    <Button theme="filled" color="error-variant">Error container</Button>
                </VStack>
                <VStack gap="8" align="start">
                    <Button disabled theme="outlined" color="primary">Primary</Button>
                    <Button theme="outlined" color="secondary">Primary</Button>
                    <Button theme="outlined" color="error">Primary</Button>
                </VStack>
                <VStack gap="8" align="start">
                    <Button theme="text" color="primary">Text</Button>
                    <Button disabled theme="text" color="primary">Text</Button>
                </VStack>
                <VStack gap="8" align="start">
                    <Button theme="elevated" color="primary">Elevated</Button>
                    <Button disabled theme="elevated" color="primary">Elevated</Button>
                </VStack>
            </HStack>
            <button onClick={open}>Открыть модалку</button>
            <Modal isOpen={visible} onClose={close}>
                ТЕСТ
            </Modal>
            {t('Тестовое предложение')}
        </div>
    )
}

export default MainPage
