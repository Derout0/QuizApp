import * as cls from './ModulesPageFilters.module.scss'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { modulesPageActions } from '@/pages/LibraryPage'

import { ModuleDisplaySelector } from '@/features/module-display-selector'

import type { ModuleDisplay } from '@/entities/module'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch, useDebounceCallback } from '@/shared/lib/hooks'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

import { getModulesPageDisplay, getModulesPageSearch } from '../../../model/selectors/modulesPageSelectors'
import { fetchModulesByUser } from '@/pages/LibraryPage/model/services/fetchModulesByUser/fetchModulesByUser'

interface ModulesPageFiltersProps {
    className?: string
}

export const ModulesPageFilters = (props: ModulesPageFiltersProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const display = useSelector(getModulesPageDisplay)
    const search = useSelector(getModulesPageSearch)

    const fetchModules = useCallback(() => {
        dispatch(fetchModulesByUser({ replaceData: true }))
    }, [dispatch])

    const debouncedFetchModules = useDebounceCallback(fetchModules, 400)

    const onChangeSearch = useCallback((value: string) => {
        dispatch(modulesPageActions.setSearch(value))
        dispatch(modulesPageActions.setPage(0))
        debouncedFetchModules()
    }, [dispatch, debouncedFetchModules])

    const onChangeDisplay = useCallback((display: ModuleDisplay) => {
        dispatch(modulesPageActions.setDisplay(display))
    }, [dispatch])

    return (
        <HStack
            className={classNames(cls.ModulesPageFilters, {}, [className])}
            gap="40"
        >
            <Input
                className={cls.search}
                value={search}
                theme="border"
                placeholder="Поиск модулей"
                onChange={onChangeSearch}
            />
            <ModuleDisplaySelector selected={display} onChange={onChangeDisplay} />
        </HStack>
    )
}
