import { classNames } from '@/shared/lib/classNames/classNames'
import type { ReactNode } from 'react'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'

interface UpdateBlockProps {
    className?: string
    title: string
    children: ReactNode
}

export const UpdateBlock = (props: UpdateBlockProps) => {
    const {
        className,
        title,
        children,
    } = props

    return (
        <VStack gap="12" className={classNames('', {}, [className])}>
            <Text sx={{ fontSize: 'title-m', fontWeight: '500' }}>{title}</Text>
            {children}
        </VStack>
    )
}
