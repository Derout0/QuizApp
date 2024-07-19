import * as cls from './Button.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

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
    disabled?: boolean
}

export const Button = <Theme extends ButtonTheme>(props: ButtonProps<Theme>) => {
    const {
        className,
        children,
        theme,
        color,
        size,
        disabled,
        type = 'button',
        ...other
    } = props

    const additional: string[] = [
        className,
        (theme ? cls[theme] : null),
        (color ? cls[color] : null),
        (size ? cls[size] : null),
    ]

    const mods: Mods = {
        [cls.disabled]: disabled,
    }

    return (
        <button type={type} className={classNames(cls.Button, mods, additional)} disabled={disabled} {...other}>
            {children}
        </button>
    )
}
