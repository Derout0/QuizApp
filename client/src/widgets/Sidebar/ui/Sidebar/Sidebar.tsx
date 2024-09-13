import * as cls from './Sidebar.module.scss'

import React, { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

import HomeIcon from '@/shared/assets/icons/Home.svg'
import FolderIcon from '@/shared/assets/icons/Folder.svg'
import NotificationIcon from '@/shared/assets/icons/Notification.svg'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import Logo from '@/shared/assets/Logo.svg'
import { Icon } from '@/shared/ui/Icon/Icon'
import { getRouteMain } from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { Text } from '@/shared/ui/Text/Text'
import { SidebarItem } from '@/widgets/Sidebar/ui/SidebarItem/SidebarItem'
import { Hamburger } from '@/shared/ui/Hamburger/Hamburger'

import { sidebarAnimation, titleAnimation } from '../../lib/animation'

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
            initial="collapsed"
            variants={sidebarAnimation}
            animate={collapsed ? 'collapsed' : 'visible'}
        >
            <VStack gap="20">
                <HStack className={cls.header} justify="space-between" align="center">
                    <AppLink className={cls.logo} to={getRouteMain()}>
                        <Icon width="120px" SVG={Logo} />
                    </AppLink>
                    <Hamburger onClick={onToggle} size="small" collapsed={collapsed} />
                </HStack>
                <VStack className={cls.body} gap="20">
                    <VStack className={cls.block}>
                        <motion.div initial="collapsed" variants={titleAnimation} animate={collapsed ? 'collapsed' : 'visible'}>
                            <Text noWrap className={cls.title} sx={{ fontWeight: '600', color: 'on-surface-variant' }}>Навигация</Text>
                        </motion.div>
                        <VStack as="ul" gap="4">
                            <SidebarItem collapsed={collapsed} path="/" Icon={HomeIcon}>Главная</SidebarItem>
                            <SidebarItem collapsed={collapsed} path="/" Icon={FolderIcon}>Библиотека</SidebarItem>
                            <SidebarItem collapsed={collapsed} path="/" Icon={NotificationIcon}>Оповещения</SidebarItem>
                        </VStack>
                    </VStack>
                    <VStack className={cls.block}>
                        <motion.div initial="collapsed" variants={titleAnimation} animate={collapsed ? 'collapsed' : 'visible'}>
                            <Text noWrap className={cls.title} sx={{ fontWeight: '600', color: 'on-surface-variant' }}>
                                Обучающий режим
                            </Text>
                        </motion.div>
                        <VStack as="ul" gap="4">
                            <SidebarItem collapsed={collapsed} path="/" Icon={HomeIcon}>Карточки</SidebarItem>
                            <SidebarItem
                                collapsed={collapsed}
                                path="/"
                                Icon={NotificationIcon}
                            >
                                Оповещения
                            </SidebarItem>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </motion.aside>
    )
})
