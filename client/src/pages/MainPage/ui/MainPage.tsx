import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { FlashCardsSlider } from '@/features/flash-cards-slider/ui/FlashCardsSlider/FlashCardsSlider'

const MainPage = () => {
    const { t, i18n } = useTranslation('pages/main')

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div className={classNames('1')}>
            <button onClick={toggle}>Переключить</button>
            {t('Тестовое предложение')}
            <FlashCardsSlider terms={[
                { termId: '1', term: 'Name', definition: 'Имя' },
                { termId: '32', term: 'Name 2', definition: 'Имя 2' },
                { termId: '3', term: 'Name 3', definition: 'Имя 3' },
                { termId: '42', term: 'Name 4', definition: 'Имя 4' },
                { termId: '5', term: 'Name 5', definition: 'Имя 5' },
                { termId: '6', term: 'Name 6', definition: 'Имя 6' },
            ]}
            />
        </div>
    )
}

export default MainPage
