import * as cls from './LibraryPage.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { AppPaths } from '@/shared/consts/router'
import { ToggleButtonGroup } from '@/shared/ui/ToggleButtonGroup/ToggleButtonGroup/ToggleButtonGroup'
import { ToggleButton } from '@/shared/ui/ToggleButtonGroup/ToggleButton/ToggleButton'
import { VStack } from '@/shared/ui/Stack'

interface LibraryPageProps {
    className?: string
}

const LibraryPage = (props: LibraryPageProps) => {
    const {
        className,
    } = props

    const location = useLocation()
    const navigate = useNavigate()

    const validPaths = [
        AppPaths.LIBRARY,
        AppPaths.LIBRARY_MODULES,
        AppPaths.LIBRARY_FOLDERS,
    ]

    const currentPath = validPaths.includes(location.pathname)
        ? location.pathname
        : AppPaths.LIBRARY

    const onToggle = (newPage: string) => {
        navigate(newPage)
    }

    return (
        <VStack gap="20" className={classNames(cls.Library, {}, [className])}>
            <Text.HeadlineH1>Ваша библиотека</Text.HeadlineH1>
            <ToggleButtonGroup
                aria-label="Select the required page"
                value={currentPath}
                onChange={onToggle}
            >
                <ToggleButton value={AppPaths.LIBRARY_MODULES}>Модули</ToggleButton>
                <ToggleButton value={AppPaths.LIBRARY_FOLDERS}>Папки</ToggleButton>
            </ToggleButtonGroup>
            <Outlet />
        </VStack>
    )
}

export default LibraryPage
