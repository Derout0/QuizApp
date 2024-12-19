import * as cls from './ModulesPage.module.scss'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ModuleDisplaySelector } from '@/features/module-display-selector'
import { ModulesList } from '@/entities/module/ui/ModulesList/ModulesList'
import type { ModuleDisplay } from '@/entities/module'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { fetchModulesByUser } from '../../model/services/fetchModulesByUser/fetchModulesByUser'
import { getModulesSelector, modulesActions, modulesReducer } from '../../model/slices/modulesSlice'
import { getModulesPageDisplay, getModulesPageIsLoading } from '../../model/selectors/modulesPageSelectors'

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
    const modules = useSelector(getModulesSelector.selectAll)
    const isLoading = useSelector(getModulesPageIsLoading)
    const error = useSelector(getModulesPageIsLoading)
    const display = useSelector(getModulesPageDisplay)

    useEffectOnce(() => {
        dispatch(fetchModulesByUser({}))
        dispatch(modulesActions.init())
    })

    const onChangeDisplay = useCallback((display: ModuleDisplay) => {
        dispatch(modulesActions.setDisplay(display))
    }, [dispatch])

    return (
        <AsyncReducerLoader reducers={reducers}>
            <div className={classNames(cls.ModulesPage, {}, [className])}>
                <ModuleDisplaySelector selected={display} onChange={onChangeDisplay} />
                <ModulesList display={display} modules={modules} isLoading={isLoading} />
            </div>
        </AsyncReducerLoader>
    )
}

export default ModulesPage
