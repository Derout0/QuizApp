import * as cls from './Tabs.module.scss'
import type { ReactElement } from 'react'
import { Fragment, forwardRef } from 'react'
import { TabGroup, TabList, TabPanels, Tab, TabPanel } from '@headlessui/react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'

export interface TabData {
    name: string
    element: ReactElement
}

export interface TabsProps {
    className?: string
    tabsData: TabData[]
    onTabChange?: () => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        tabsData,
        onTabChange,
    } = props

    const initTabsList = () => {
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

    const initTabsPanels = () => {
        return tabsData.map((tab, index) => (
            <TabPanel key={index}>
                {tab.element}
            </TabPanel>
        ))
    }

    return (
        <TabGroup
            className={classNames(cls.Tabs, {}, [className])}
            onChange={onTabChange}
        >
            <TabList className={cls.TabList}>
                {initTabsList()}
            </TabList>
            <TabPanels>
                {initTabsPanels()}
            </TabPanels>
        </TabGroup>
    )
}
