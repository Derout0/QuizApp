import '@/app/styles/index.scss'
import '@/shared/config/i18n/i18n'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { StoreProvider } from '@/app/providers/store-provider'
import { AuthInitializer } from '@/app/providers/router'

import { ErrorPage } from '@/widgets/Errors'

import App from './App'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <AuthInitializer>
                    <App />
                </AuthInitializer>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>
    ,
)
