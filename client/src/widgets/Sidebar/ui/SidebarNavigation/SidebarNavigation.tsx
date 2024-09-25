import * as cls from './SidebarNavigation.module.scss'

import React, { memo, useCallback } from 'react'
import { motion } from 'framer-motion'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import type { SidebarBlockType, SidebarItemType } from '../../model/types/sidebar'
import { SidebarItem } from '../../ui/SidebarItem/SidebarItem'
import { SidebarVariants, titleAnimation } from '../../lib/animation'
import { SidebarBlocks } from '../../model/items'

interface SidebarNavigationProps {
    className?: string
    collapsed: boolean
}

export const SidebarNavigation = memo((props: SidebarNavigationProps) => {
    const {
        className,
        collapsed,
    } = props

    const renderSidebarItems = useCallback((items: SidebarItemType[]) => {
        return items.map(({ name, path, Icon }) => (
            <SidebarItem key={name} collapsed={collapsed} path={path} Icon={Icon}>
                {name}
            </SidebarItem>
        ))
    }, [collapsed])

    const renderSidebarBlocks = useCallback((blocks: SidebarBlockType[]) => {
        return blocks.map(({ title, items }) => (
            <VStack key={title} className={cls.block}>
                <motion.div
                    initial={SidebarVariants.COLLAPSED}
                    variants={titleAnimation}
                    animate={collapsed ? SidebarVariants.COLLAPSED : SidebarVariants.VISIBLE}
                >
                    <Text
                        noWrap
                        className={cls.title}
                        sx={{ fontSize: 'title-s', fontWeight: '600', color: 'on-surface-variant' }}
                    >
                        {title}
                    </Text>
                </motion.div>
                <VStack as="ul" gap="4">
                    {renderSidebarItems(items)}
                </VStack>
            </VStack>
        ))
    }, [collapsed, renderSidebarItems])

    return (
        <VStack gap="20" className={classNames(cls.SidebarNavigation, {}, [className])}>
            {renderSidebarBlocks(SidebarBlocks)}
        </VStack>
    )
})
