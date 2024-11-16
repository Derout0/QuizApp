import * as cls from './Button.module.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import { HStack } from '@/shared/ui/Stack'

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

export type ButtonTheme = keyof ButtonColorsMap
type ButtonColor<T extends ButtonTheme> = ButtonColorsMap[T]

type ButtonSize = 'small' | 'medium' | 'large'

// TODO: Add colors for ripple effect
const rippleColorsMap: Record<ButtonTheme, Record<string, string>> = {
    filled: {
        'primary': '#eee',
        'primary-variant': '#eee',
        'secondary': '#eee',
        'secondary-variant': '#eee',
        'error': '#eee',
        'error-variant': '#eee',
    },
    outlined: {},
    elevated: {},
    text: {},
}

export interface ButtonProps<Theme extends ButtonTheme> extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children?: ReactNode
    theme?: Theme
    color?: ButtonColor<Theme>
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
    disableRipple?: boolean
}

export const Button = memo(<Theme extends ButtonTheme>(props: ButtonProps<Theme>) => {
    const {
        className,
        children,
        theme,
        color = 'primary',
        size,
        loading,
        disabled,
        disableRipple,
        type = 'button',
        ...other
    } = props

    const rippleColor = theme ? rippleColorsMap[theme]?.[color] : undefined

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

    const component = (
        <HStack as="span" align="center" justify="center" gap="8">
            {children}
            {loading && <span className={cls.loader} />}
        </HStack>
    )

    if (disableRipple) {
        return (
            <button type={type} className={classNames(cls.Button, mods, additional)} disabled={disabled} {...other}>
                {component}
            </button>
        )
    }

    return (
        <Ripple as="button" color={rippleColor} type={type} className={classNames(cls.Button, mods, additional)} disabled={disabled} {...other}>
            {component}
        </Ripple>
    )
})
