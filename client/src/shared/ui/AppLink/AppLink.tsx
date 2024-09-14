import * as cls from './AppLink.module.scss'
import type { FunctionComponent, ReactNode, SVGAttributes } from 'react'
import { memo } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon/Icon'

type AppLinkTheme = 'primary'

interface AppLinkProps extends LinkProps {
    className?: string
    children?: ReactNode
    theme?: AppLinkTheme
    startIcon?: FunctionComponent<SVGAttributes<SVGElement>>
    endIcon?: FunctionComponent<SVGAttributes<SVGElement>>
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        className,
        children,
        to,
        theme,
        startIcon: StartIcon,
        endIcon: EndIcon,
    } = props

    const additional = [
        className,
        (theme ? cls[theme] : null),
    ]

    return (
        <Link to={to} className={classNames(cls.AppLink, {}, additional)}>
            {StartIcon && <Icon SVG={StartIcon} />}
            <span>{children}</span>
            {EndIcon && <Icon SVG={EndIcon} />}
        </Link>
    )
})
