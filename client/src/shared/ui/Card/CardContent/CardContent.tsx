import * as cls from './CardContent.module.scss'
import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

interface CardContentProps {
    className?: string
    children: ReactNode
}

export const CardContent = (props: CardContentProps) => {
    const {
        className,
        children,
    } = props

    return (
        <div className={classNames(cls.CardContent, {}, [className])}>
            {children}
        </div>
    )
}
