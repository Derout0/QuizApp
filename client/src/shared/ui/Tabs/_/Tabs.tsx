import * as cls from '@/shared/ui/Tabs/_/Tabs.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

import type { ReactNode } from 'react'
import { TabsProvider } from '@/shared/ui/Tabs/_/TabsProvider'

interface TabsProps {
    className?: string
    children: ReactNode
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        children,
    } = props

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            <TabsProvider>
                {children}
            </TabsProvider>
        </div>
    )
}
