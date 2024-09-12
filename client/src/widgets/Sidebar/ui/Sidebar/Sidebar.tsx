import * as cls from './Sidebar.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import React, { memo, useState } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import Logo from '@/shared/assets/Logo.svg'
import { Icon } from '@/shared/ui/Icon/Icon'

console.log(Logo)

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
    } = props

    const [collapsed, setCollapsed] = useState<boolean>(false)

    const mods: Mods = {
        [cls.collapsed]: collapsed,
    }

    return (
        <aside className={classNames(cls.Sidebar, mods, [className])}>
            <VStack className={cls.SidebarWrapper}>
                <HStack className={cls.header}>
                    <Icon SVG={Logo} />
                </HStack>
            </VStack>
        </aside>
    )
})
