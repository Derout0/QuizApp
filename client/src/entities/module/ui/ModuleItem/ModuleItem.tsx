import * as cls from './ModuleItem.module.scss'
import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import type { ModuleEntity } from '../../model/types/module'
import type { ModuleDisplay } from '../../model/consts/module'
import { AppPaths } from '@/shared/consts/router'

interface ModuleItemProps {
    className?: string
    module?: ModuleEntity
    display: ModuleDisplay
}

export const ModuleItem = memo((props: ModuleItemProps) => {
    const {
        className,
        module,
        display,
    } = props

    const navigate = useNavigate()

    const onClickModule = useCallback(() => {
        if (module?.moduleId) navigate(AppPaths.LIBRARY_MODULE_DETAILS(module?.moduleId))
    }, [])

    return (
        <Ripple
            className={classNames(cls.ModuleItem, {}, [className, cls[display]])}
            onClick={onClickModule}
            color="var(--primary-color-opacity-24)"
        >
            <VStack gap="8">
                <HStack gap="12" align="center">
                    <Text sx={{ fontWeight: '500', fontSize: 'body-m' }}>
                        {module?.terms.length} термин(ов)
                    </Text>
                    <Text sx={{ fontWeight: '500', fontSize: 'body-m' }} className={cls.author}>
                        Автор:
                        <Text.SPAN sx={{ color: 'secondary' }}>
                            {' '}
                            {module?.author}
                        </Text.SPAN>
                    </Text>
                </HStack>
                <Text sx={{ fontSize: 'title-l', fontWeight: '700', color: 'secondary' }}>
                    {module?.name}
                </Text>
            </VStack>
        </Ripple>
    )
})
