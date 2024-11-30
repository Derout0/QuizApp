import * as cls from './LibraryPage.module.scss'
import { useNavigate } from 'react-router'
import { useLocation, Outlet } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import type { TabData } from '@/shared/ui/Tabs/Tabs'

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
            <Outlet />
        </div>
    )
}

export default LibraryPage
