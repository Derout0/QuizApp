import * as cls from './IconButton.module.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'

type ButtonTheme = 'standard' | 'filled' | 'tonal' | 'outlined'
type ButtonSize = 'small' | 'medium' | 'large'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: ReactNode
    theme?: ButtonTheme
    size?: ButtonSize
    disabled?: boolean
}

export const IconButton = (props: IconButtonProps) => {
    const {
        className,
        children,
        theme = 'standard',
        size,
        disabled,
        ...other
    } = props

    const additional: string[] = [
        className,
        (theme && cls[theme]),
        (size && cls[size]),
    ]

    const mods: Mods = {
        [cls.disabled]: disabled,
    }

    return (
        <button className={classNames(cls.IconButton, mods, additional)} {...other}>
            {children}
        </button>
    )
}
