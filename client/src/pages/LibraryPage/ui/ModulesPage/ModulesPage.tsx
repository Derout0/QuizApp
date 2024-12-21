import * as cls from './ModulesPage.module.scss'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ModuleDisplaySelector } from '@/features/module-display-selector'

import type { ModuleDisplay } from '@/entities/module'
import { ModulesList } from '@/entities/module/ui/ModulesList/ModulesList'

import { useAppDispatch, useEffectOnce, useInfiniteScroll } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { LoaderHandler } from '@/shared/lib/components/LoaderHandler/LoaderHandler'

import { fetchModulesByUser } from '../../model/services/fetchModulesByUser/fetchModulesByUser'
import { fetchNextModulesPage } from '../../model/services/fetchNextModulesPage/fetchNextModulesPage'
import { getModulesSelector, modulesActions, modulesReducer } from '../../model/slices/modulesSlice'
import {
    getModulesPageDisplay, getModulesPageError,
    getModulesPageIsLoading, getModulesPagePaginationHasMore,
} from '../../model/selectors/modulesPageSelectors'
import { Outlet } from 'react-router-dom'

interface ModulesPageProps {
    className?: string
}

const reducers: ReducersList = {
    modules: modulesReducer,
}

const ModulesPage = (props: ModulesPageProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const display = useSelector(getModulesPageDisplay)
    const modules = useSelector(getModulesSelector.selectAll)
    const isLoading = useSelector(getModulesPageIsLoading)
    const hasMore = useSelector(getModulesPagePaginationHasMore)
    const error = useSelector(getModulesPageError)

    const onChangeDisplay = useCallback((display: ModuleDisplay) => {
        dispatch(modulesActions.setDisplay(display))
    }, [dispatch])

    const onLoadNextModules = useCallback(() => {
        dispatch(fetchNextModulesPage())
    }, [dispatch])

    useEffectOnce(() => {
        dispatch(modulesActions.init())
        dispatch(fetchModulesByUser({ page: 0 }))
    })

    useEffect(() => {
        if (hasMore && !isLoading && document.body.scrollHeight <= document.body.clientHeight) {
            onLoadNextModules()
        }
    }, [dispatch, isLoading, hasMore, onLoadNextModules, display])

    useInfiniteScroll(window, onLoadNextModules, { distance: 10 })

    return (
        <AsyncReducerLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.ModulesPage, {}, [className])}>
                <ModuleDisplaySelector selected={display} onChange={onChangeDisplay} />
                <LoaderHandler error={error}>
                    <ModulesList display={display} modules={modules} isLoading={isLoading} />
                </LoaderHandler>
            </div>
            <Outlet />
        </AsyncReducerLoader>
    )
}

export default ModulesPage
