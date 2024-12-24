import * as cls from './Card.module.scss'
import type { ReactNode } from 'react'
import type { Additional } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'

type CardTheme = 'filled' | 'outlined' | 'elevated'

interface CardProps {
    className?: string
    children: ReactNode
    theme?: CardTheme
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        theme = 'filled',
    } = props

    const additional: Additional = [
        className,
        (theme ? cls[theme] : null),
    ]

    return (
        <div className={classNames(cls.Card, {}, additional)}>
            {children}
        </div>
    )
}
