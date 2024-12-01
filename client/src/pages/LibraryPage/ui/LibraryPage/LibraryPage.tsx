import * as cls from './LibraryPage.module.scss'
import { Outlet } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { AppPaths } from '@/shared/consts/router'

interface ModulesProps {
    className?: string
}

const LibraryPage = (props: ModulesProps) => {
    const {
        className,
    } = props

    return (
        <div className={classNames(cls.Library, {}, [className])}>
            <Text.HeadlineH1>Your Library</Text.HeadlineH1>
            <AppLink to={AppPaths.LIBRARY_MODULES}>Модули</AppLink>
            <AppLink to={AppPaths.LIBRARY_FOLDERS}>Папки</AppLink>
            <Outlet />
        </div>
    )
}

export default LibraryPage
