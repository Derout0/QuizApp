import '@/app/styles/index.scss'
import '@/shared/config/i18n/i18n'
import { createRoot } from 'react-dom/client'

import { AppRouter } from '@/app/providers/router'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
    <>
        <AppRouter />
    </>
    ,
)
