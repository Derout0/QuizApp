import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from '@/widgets/Errors'
import { App, AuthInitializer } from '@/app/providers/router'
import { StoreProvider } from '@/app/providers/store-provider'

const Root = () => {
    return (
        <StoreProvider>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <AuthInitializer>
                    <App />
                </AuthInitializer>
            </ErrorBoundary>
        </StoreProvider>
    )
}

export default Root
