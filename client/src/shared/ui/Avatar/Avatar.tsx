import * as cls from './Avatar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import DefaultAvatarURL from '@/shared/assets/icons/DefaultAvatar.svg'

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
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        alt,
        color,
        theme,
        size = 'medium',
    } = props

    const avatarSrc = src || DefaultAvatarURL

    const additional: string[] = [
        className,
        cls[color],
        cls[theme],
        cls[size],
    ]

    return (
        <div className={classNames(cls.Avatar, {}, additional)}>
            <img src={avatarSrc} alt={alt} />
        </div>
    )
}
