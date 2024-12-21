import * as cls from './Skeleton.module.scss'
import type { CSSProperties, ReactNode } from 'react'
import { memo } from 'react'
import type { Additional } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { TextTheme } from '@/shared/ui/Text/types'

type SkeletonTypographyTheme = TextTheme
type SkeletonTheme = 'circular' | 'rectangular' | SkeletonTypographyTheme
type SkeletonAnimation = 'pulse' | false
type SkeletonColor = 'primary' | 'on-primary'

interface SkeletonProps {
    className?: string
    children?: ReactNode
    width?: string | number
    height?: string | number
    animation?: SkeletonAnimation
    theme?: SkeletonTheme
    color?: SkeletonColor
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        children,
        width = '100%',
        height = '100%',
        theme,
        animation = 'pulse',
        color,
    } = props

    const styles: CSSProperties = {
        maxWidth: width,
        height,
    }

    const additional: Additional = [
        className,
        (theme && [cls[`theme-${theme}`]]),
        (animation && [cls[animation]]),
        (color && [cls[color]]),
    ]

    return (
        <div style={styles} className={classNames(cls.Skeleton, {}, additional)}>
            {children}
        </div>
    )
})
