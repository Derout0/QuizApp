import * as cls from './ModuleDetailsPage.module.scss'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { ModuleDetails, moduleDetailsReducer } from '@/entities/module'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LoaderHandler } from '@/shared/lib/components/LoaderHandler/LoaderHandler'
import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'

interface ModuleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    moduleDetails: moduleDetailsReducer,
}

export const ModuleDetailsPage = memo((props: ModuleDetailsPageProps) => {
    const {
        className,
    } = props

    const { id } = useParams<{ id: string }>()

    if (!id) {
        return <LoaderHandler error="ID модуля не найден" />
    }

    return (
        <AsyncReducerLoader reducers={reducers}>
            <div className={classNames(cls.ModuleDetailsPage, {}, [className])}>
                <ModuleDetails id={id} />
            </div>
        </AsyncReducerLoader>

    )
})
