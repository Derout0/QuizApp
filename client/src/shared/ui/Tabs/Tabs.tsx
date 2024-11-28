import * as cls from './Tabs.module.scss'
import type { ReactElement } from 'react'
import { useMemo } from 'react'
import { Fragment } from 'react'
import { TabGroup, TabList, TabPanels, Tab, TabPanel } from '@headlessui/react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'

export interface TabData {
    id: string
    name: string
    element: ReactElement
}

export interface TabsProps {
    className?: string
    tabsData: TabData[]
    onTabChange?: (args: any) => void
    defaultTabId?: string
}

const TabsList = ({ tabsData }: { tabsData: TabData[] }) => {
    return tabsData.map((tab, index) => (
        <Tab key={index} as={Fragment}>
            {({ hover, selected }) => {
                const mods: Mods = {
                    [cls.hovered]: hover,
                    [cls.selected]: selected,
                }

                return (
                    <button className={classNames(cls.Tab, mods, [])}>
                        {tab.name}
                    </button>
                )
            }}
        </Tab>
    ))
}

const TabsPanel = ({ tabsData }: { tabsData: TabData[] }) => {
    return tabsData.map((tab, index) => (
        <TabPanel key={index}>
            {tab.element}
        </TabPanel>
    ))
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        tabsData,
        onTabChange,
        defaultTabId,
    } = props

    const defaultTabIndex = useMemo(() => {
        const index = tabsData.findIndex(tab => tab.id === defaultTabId)
        return index !== -1 ? index : 0
    }, [defaultTabId, tabsData])

    return (
        <TabGroup
            className={classNames(cls.Tabs, {}, [className])}
            onChange={onTabChange}
            defaultIndex={defaultTabIndex}
        >
            <TabList className={cls.TabList}>
                <TabsList tabsData={tabsData} />
            </TabList>
            <TabPanels>
                <TabsPanel tabsData={tabsData} />
            </TabPanels>
        </TabGroup>
    )
}
