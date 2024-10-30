import * as cls from './Avatar.module.scss'
import type { ComponentPropsWithoutRef, ElementType } from 'react'
import DefaultAvatar from '@/shared/assets/icons/DefaultAvatar.svg?url'
import { classNames } from '@/shared/lib/classNames/classNames'

type AvatarColor = 'primary'
type AvatarTheme = 'outlined'
type AvatarSize = 'small' | 'medium' | 'large'

interface AvatarProps<T extends ElementType = 'div'> {
    className?: string
    src?: string
    as?: T
    alt?: string
    color?: AvatarColor
    theme?: AvatarTheme
    size?: AvatarSize
}

type Props<T extends ElementType> = AvatarProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof AvatarProps<T>>

export const Avatar = <T extends ElementType = 'div'>(props: Props<T>) => {
    const {
        className,
        as: Component = 'div',
        src,
        alt,
        color,
        theme,
        size,
        ...other
    } = props

    const initialSrc = src || DefaultAvatar

    const additional: string[] = [
        className,
        color ? cls[color] : null,
        theme ? cls[theme] : null,
        size ? cls[size] : null,
    ]

    return (
        <Component className={classNames(cls.Avatar, {}, additional)} {...other}>
            <img src={initialSrc} alt={alt} />
        </Component>
    )
}
