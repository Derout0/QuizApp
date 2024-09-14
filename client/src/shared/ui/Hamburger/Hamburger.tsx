import * as cls from './Hamburger.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ButtonHTMLAttributes } from 'react'
import { memo } from 'react'

type HamburgerSize = 'small' | 'medium' | 'large'

interface HamburgerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    collapsed: boolean
    size?: HamburgerSize
}
export const Hamburger = memo((props: HamburgerProps) => {
    const {
        className,
        collapsed = false,
        size = 'medium',
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.collapsed]: collapsed,
    }

    return (
        <button type="button" className={classNames(cls.Hamburger, mods, [className, cls[size]])} {...otherProps}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
})
