import * as cls from './ModuleItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import type { ModuleEntity } from '../../model/types/module'
import type { ModuleDisplay } from '../../model/consts/module'

interface ModuleItemProps {
    className?: string
    module?: ModuleEntity
    display: ModuleDisplay
}

export const ModuleItem = (props: ModuleItemProps) => {
    const {
        className,
        module,
        display,
    } = props

    return (
        <Ripple className={classNames(cls.ModuleItem, {}, [className, cls[display]])} color="var(--primary-color-opacity-24)">
            <VStack gap="8">
                <HStack gap="12" align="center">
                    <Text sx={{ fontWeight: '500', fontSize: 'body-m' }}>
                        {module?.terms.length}
                        {' '}
                        термин(ов)
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
}
