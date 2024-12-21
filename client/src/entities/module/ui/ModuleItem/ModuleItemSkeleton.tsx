import * as cls from './ModuleItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export const ModuleItemSkeleton = () => {
    return (
        <Skeleton className={classNames(cls.ModuleItem, {}, [cls.skeleton])}>
            <VStack flexGrow={1} gap="8">
                <HStack gap="12" align="center">
                    <Skeleton color="on-primary" width={100} theme="body-m" />
                    <Skeleton color="on-primary" width={200} theme="body-m" />
                </HStack>
                <Skeleton color="on-primary" theme="title-l" />
            </VStack>
        </Skeleton>
    )
}
