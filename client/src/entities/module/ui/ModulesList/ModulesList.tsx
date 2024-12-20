import * as cls from './ModulesList.module.scss'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { ModuleDisplay } from '../../model/consts/module'
import type { ModuleEntity } from '../../model/types/module'
import { ModuleItem } from '../ModuleItem/ModuleItem'

interface ModuleListProps {
    className?: string
    modules: ModuleEntity[]
    isLoading: boolean
    display: ModuleDisplay
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
            <ModuleItems modules={modules} display={display} />
        </VStack>
    )
})
