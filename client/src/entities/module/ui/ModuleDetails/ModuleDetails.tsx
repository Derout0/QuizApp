import * as cls from './ModuleDetails.module.scss'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { useAppDispatch } from '@/shared/lib/hooks'
import { LoaderHandler } from '@/shared/lib/components/LoaderHandler/LoaderHandler'
import { getModuleDetailsData } from '@/entities/module'
import { fetchModuleById } from '@/entities/module/model/service/fetchModuleById/fetchModuleById'
import { getModuleDetailsIsLoading } from '../../model/selectors/getModuleSelectors'

interface ModuleDetailsProps {
    className?: string
    id: string
}

export const ModuleDetails = (props: ModuleDetailsProps) => {
    const {
        className,
        id,
    } = props

    const dispatch = useAppDispatch()
    const module = useSelector(getModuleDetailsData)
    const isLoading = useSelector(getModuleDetailsIsLoading)

    useEffect(() => {
        dispatch(fetchModuleById(id))
    }, [id])

    return (
        <LoaderHandler isLoading={isLoading}>
            <div className={classNames(cls.ModuleDetails, {}, [className])}>
                <Text>Название модуля: {module?.name}</Text>
            </div>
        </LoaderHandler>
    )
}
