import { Suspense } from 'react'
import { AppRouter } from '@/app/providers/router'
import { Navbar } from '@/widgets/Navbar/ui/Navbar/Navbar'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'
import { checkAuthorization } from '@/entities/user'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar/Sidebar'

const App = () => {
    const dispatch = useAppDispatch()

    useEffectOnce(() => {
        if (localStorage.getItem(USER_ACCESS_TOKEN)) {
            dispatch(checkAuthorization())
        }
    })

    return (
        <Suspense fallback={<div>Loading for language...</div>}>
            <VStack className="App">
                <HStack flexGrow={1} className="AppInner">
                    <Sidebar />
                    <main className="AppMain">
                        <Navbar />
                        <AppRouter />
                    </main>
                </HStack>
            </VStack>
        </Suspense>
    )
}

export default App
