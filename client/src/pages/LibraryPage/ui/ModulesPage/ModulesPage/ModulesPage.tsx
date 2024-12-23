import * as cls from './ModulesPage.module.scss'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { ModulesList } from '@/entities/module/ui/ModulesList/ModulesList'

import { useAppDispatch, useEffectOnce, useInfiniteScroll } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { LoaderHandler } from '@/shared/lib/components/LoaderHandler/LoaderHandler'
import { VStack } from '@/shared/ui/Stack'

import { fetchModulesByUser } from '../../../model/services/fetchModulesByUser/fetchModulesByUser'
import { fetchNextModulesPage } from '../../../model/services/fetchNextModulesPage/fetchNextModulesPage'
import { getModulesPageSelector, modulesPageActions, modulesPageReducer } from '../../../model/slices/modulesPageSlice'
import {
    getModulesPageDisplay,
    getModulesPageError,
    getModulesPageIsLoading,
    getModulesPagePaginationHasMore,
} from '../../../model/selectors/modulesPageSelectors'
import { ModulesPageFilters } from '../ModulesPageFilters/ModulesPageFilters'

interface ModulesPageProps {
    className?: string
}

const reducers: ReducersList = {
    modulesPage: modulesPageReducer,
}

const ModulesPage = (props: ModulesPageProps) => {
    const {
        className,
    } = props

    const dispatch = useAppDispatch()
    const display = useSelector(getModulesPageDisplay)
    const modules = useSelector(getModulesPageSelector.selectAll)
    const isLoading = useSelector(getModulesPageIsLoading)
    const hasMore = useSelector(getModulesPagePaginationHasMore)
    const error = useSelector(getModulesPageError)

    const [searchParams] = useSearchParams()

    const onLoadNextModules = useCallback(() => {
        if (hasMore && !isLoading) dispatch(fetchNextModulesPage())
    }, [dispatch, hasMore, isLoading])

    useEffectOnce(() => {
        dispatch(modulesPageActions.init(searchParams))
        dispatch(fetchModulesByUser())
    })

    // TODO: Fix
    // If the window is not scrollable, load the modules
    // useEffect(() => {
    //     if (isFirstRender && document.body.scrollHeight <= document.body.clientHeight) {
    //         onLoadNextModules()
    //     }
    // }, [dispatch, isFirstRender, onLoadNextModules])

    useInfiniteScroll(window, onLoadNextModules, { distance: 30 })

    return (
        <AsyncReducerLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack gap="20" className={classNames(cls.ModulesPage, {}, [className])}>
                <ModulesPageFilters />
                <LoaderHandler error={error}>
                    <ModulesList display={display} modules={modules} isLoading={isLoading} />
                </LoaderHandler>
            </VStack>
        </AsyncReducerLoader>
    )
}

export default ModulesPage
