import * as cls from './ModulesList.module.scss'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { ModuleDisplay } from '../../model/consts/module'
import type { ModuleEntity } from '../../model/types/module'
import { ModuleItem } from '../ModuleItem/ModuleItem'
import { LoaderHandler } from '@/shared/lib/components/LoaderHandler/LoaderHandler'
import { ModuleItemSkeleton } from '@/entities/module/ui/ModuleItem/ModuleItemSkeleton'

interface ModuleListProps {
    className?: string
    modules: ModuleEntity[]
    display: ModuleDisplay
    isLoading: boolean
}

const ModuleSkeletonItems = ({ display }: { display: ModuleDisplay }) => {
    return new Array(display === ModuleDisplay.SINGLE ? 3 : 6).fill(0).map((_, index) => {
        return (
            <ModuleItemSkeleton key={index} />
        )
    })
}

const ModuleItems = ({ modules, display }: { modules: ModuleEntity[], display: ModuleDisplay }) => {
    const render = (module?: ModuleEntity) => {
        return (
            <ModuleItem key={module?.moduleId} module={module} display={display} />
        )
    }

    return modules.map(render)
}

export const ModulesList = memo((props: ModuleListProps) => {
    const {
        className,
        modules,
        display = ModuleDisplay.SINGLE,
        isLoading,
    } = props

    return (
        <VStack gap="12" className={classNames(cls.ModulesList, {}, [className, cls[display]])}>
            <LoaderHandler
                loaderComponent={<ModuleSkeletonItems display={display} />}
                isLoading={isLoading}
                preserveContent={true}
            >
                <ModuleItems modules={modules} display={display} />
            </LoaderHandler>
        </VStack>
    )
})
