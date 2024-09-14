import * as cls from './SidebarItem.module.scss'
import type { FunctionComponent, ReactNode, SVGAttributes } from 'react'
import { memo } from 'react'
import React from 'react'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink/AppLink'

interface SidebarItemProps {
    className?: string
    children: ReactNode
    collapsed: boolean
    path: string
    Icon?: FunctionComponent<SVGAttributes<SVGElement>>
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        className,
        children,
        collapsed,
        path,
        Icon,
    } = props

    const mods: Mods = {
        [cls.collapsed]: collapsed,
    }

    return (
        <li className={classNames(cls.SidebarItem, mods, [className])}>
            <AppLink className={cls.link} theme="primary" to={path} startIcon={Icon}>{children}</AppLink>
        </li>
    )
})
