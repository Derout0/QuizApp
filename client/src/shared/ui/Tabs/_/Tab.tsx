import { useTabsContext } from '@/shared/ui/Tabs/_/TabsProvider'

interface TabProps {
    index: number
    title: string
}

export const Tab = (props: TabProps) => {
    const {
        index,
        title,
    } = props

    const { currentIndex, setCurrentIndex } = useTabsContext()

    const handleClick = () => {
        setCurrentIndex(index)
    }

    return (
        <button
            role="tab"
            data-index={index}
            aria-selected={currentIndex === index}
            onClick={handleClick}
            className={currentIndex === index ? 'active' : ''}
        >
            {title}
        </button>
    )
}
