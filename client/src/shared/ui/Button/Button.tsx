import * as cls from './Button.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'

type ButtonFilledColors = 'primary' | 'primary-variant' | 'secondary' | 'secondary-variant' | 'error' | 'error-variant'
type ButtonOutlinedColors = 'primary' | 'secondary' | 'error'
type ButtonTextColors = 'primary'
type ButtonElevatedColors = 'primary'

type ButtonColorsMap = {
    filled: ButtonFilledColors
    outlined: ButtonOutlinedColors
    text: ButtonTextColors
    elevated: ButtonElevatedColors
}

type ButtonTheme = keyof ButtonColorsMap
type ButtonColor<T extends ButtonTheme> = ButtonColorsMap[T]

type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps<Theme extends ButtonTheme> extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children?: ReactNode
    theme?: Theme
    color?: ButtonColor<Theme>
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
}

export const Button = memo(<Theme extends ButtonTheme>(props: ButtonProps<Theme>) => {
    const {
        className,
        children,
        theme,
        color,
        size,
        disabled,
        loading,
        type = 'button',
        ...other
    } = props

    const additional: string[] = [
        className,
        (theme && cls[theme]),
        (color && cls[color]),
        (size && cls[size]),
    ]

    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.loading]: loading,
    }

    return (
        <button type={type} className={classNames(cls.Button, mods, additional)} disabled={disabled} {...other}>
            {children}
            {loading && <span className={cls.loader}></span>}
        </button>
    )
})
