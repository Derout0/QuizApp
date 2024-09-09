import * as cls from './Navbar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

import { useSelector } from 'react-redux'

import { getUserAuthorized } from '@/entities/user'

import { AuthorizedNavbar } from '../AuthorizedNavbar/AuthorizedNavbar'
import { UnauthorizedNavbar } from '../UnauthorizedNavbar/UnauthorizedNavbar'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const {
        className,
    } = props

    const authorized = useSelector(getUserAuthorized)

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            {authorized ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
        </header>
    )
}
