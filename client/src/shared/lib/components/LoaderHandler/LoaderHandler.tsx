import type { ReactNode } from 'react'
import { PageLoader } from '@/widgets/PageLoader'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'

interface BaseProps {
    children?: ReactNode
    preserveContent?: boolean
}

interface LoaderProps extends BaseProps {
    isLoading?: boolean
    loaderComponent?: ReactNode
}

interface ErrorProps extends BaseProps {
    error?: string
    errorComponent?: ReactNode
}

type LoaderHandlerProps = LoaderProps & ErrorProps

const DefaultError = ({ error }: { error?: string }) => {
    return (
        <VStack align="center" gap="12">
            <Text sx={{ color: 'error' }}>Произошла ошибка при загрузке</Text>
            {error && (
                <Text sx={{ color: 'error' }}>
                    Описание ошибки: {error}
                </Text>
            )}
        </VStack>
    )
}

export const LoaderHandler = (props: LoaderHandlerProps) => {
    const {
        children,
        loaderComponent,
        errorComponent,
        isLoading,
        error,
        preserveContent,
    } = props

    const loaderElement = loaderComponent || <PageLoader />
    const errorElement = errorComponent || <DefaultError error={error} />

    if (!preserveContent) {
        if (isLoading) return loaderElement
        if (error) return errorElement
    }

    return (
        <>
            {children}
            {isLoading && loaderElement}
            {error && errorElement}
        </>
    )
}
