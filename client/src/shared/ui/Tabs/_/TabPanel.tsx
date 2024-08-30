import type { ReactNode } from 'react'
import { useTabsContext } from '@/shared/ui/Tabs/_/TabsProvider'

interface TabPanelProps {
    index?: number
    children: ReactNode
}

export const TabPanel = (props: TabPanelProps) => {
    const {
        index,
        children,
    } = props

    const { currentIndex } = useTabsContext()

    return (
        currentIndex === index && (
            <div
                role="tabpanel"
                data-index={index}
                className="tab-content"
            >
                {children}
            </div>
        )
    )
}
