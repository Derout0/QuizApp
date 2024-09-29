import * as cls from './Sidebar.module.scss'

import React, { memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import logo from '@/shared/assets/Logo.svg?url'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { getRouteMain } from '@/shared/consts/router'
import { Hamburger } from '@/shared/ui/Hamburger/Hamburger'

import { sidebarAnimation, SidebarVariants } from '../../lib/animation'
import { SidebarNavigation } from '../SidebarNavigation/SidebarNavigation'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
    } = props

    const [collapsed, setCollapsed] = useState<boolean>(true)

    const onToggle = useCallback(() => {
        setCollapsed(!collapsed)
    }, [collapsed])

    const mods: Mods = {
        [cls.collapsed]: collapsed,
    }

    return (
        <motion.aside
            className={classNames(cls.Sidebar, mods, [className])}
            initial={SidebarVariants.COLLAPSED}
            variants={sidebarAnimation}
            animate={collapsed ? SidebarVariants.COLLAPSED : SidebarVariants.VISIBLE}
        >
            <VStack gap="20">
                <HStack className={cls.header} justify="space-between" align="center">
                    <Link className={classNames(cls.logo)} to={getRouteMain()}>
                        <img width={120} src={logo} alt="QuizApp" />
                    </Link>
                    <Hamburger onClick={onToggle} size="small" collapsed={collapsed} />
                </HStack>
                <VStack className={cls.body} gap="20">
                    <SidebarNavigation collapsed={collapsed} />
                </VStack>
            </VStack>
        </motion.aside>
    )
})
