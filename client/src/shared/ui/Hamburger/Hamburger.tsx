import * as cls from './Hamburger.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ButtonHTMLAttributes } from 'react'

type Size = 'small' | 'medium' | 'large'

interface HamburgerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    collapsed: boolean
    size: Size
}
export const Hamburger = (props: HamburgerProps) => {
    const {
        className,
        collapsed = false,
        size,
    } = props

    const mods: Mods = {
        [cls.collapsed]: collapsed,
    }

    return (
        <button className={classNames(cls.Hamburger, mods, [className, cls[size]])}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}
