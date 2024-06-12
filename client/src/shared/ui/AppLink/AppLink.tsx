import * as cls from './AppLink.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface AppLinkProps extends LinkProps {
    className?: string
    children?: ReactNode
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className,
        children,
        to,
    } = props

    return (
        <Link to={to} className={classNames(cls.AppLink, {}, [className])}>
            {children}
        </Link>
    )
}
