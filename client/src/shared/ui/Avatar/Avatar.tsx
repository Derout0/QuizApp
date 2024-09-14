import * as cls from './Avatar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import DefaultAvatar from '@/shared/assets/icons/DefaultAvatar.svg?url'
import { memo } from 'react'

type AvatarColor = 'primary'
type AvatarTheme = 'outlined'
type AvatarSize = 'small' | 'medium' | 'large'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    color?: AvatarColor
    theme?: AvatarTheme
    size?: AvatarSize
}
export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        alt,
        color,
        theme,
        size = 'medium',
    } = props

    const avatarSrc = src || DefaultAvatar

    const additional: string[] = [
        className,
        (color ? cls[color] : null),
        (theme ? cls[theme] : null),
        cls[size],
    ]

    return (
        <div className={classNames(cls.Avatar, {}, additional)}>
            <img src={avatarSrc} alt={alt} />
        </div>
    )
})
