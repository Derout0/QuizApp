import { Suspense } from 'react'
import { AppRouter } from '@/app/providers/router'
import { Navbar } from '@/widgets/Navbar/ui/Navbar/Navbar'
import { useAppDispatch, useEffectOnce } from '@/shared/lib/hooks'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'
import { checkAuthorization } from '@/entities/user'

const App = () => {
    const dispatch = useAppDispatch()

    useEffectOnce(() => {
        if (localStorage.getItem(USER_ACCESS_TOKEN)) {
            dispatch(checkAuthorization())
        }
    })

    return (
        <Suspense fallback={<div>Loading for language...</div>}>
            <div className="App">
                <div className="AppInner">
                    <Navbar />
                    <main className="AppMain">
                        <AppRouter />
                    </main>
                </div>
            </div>
        </Suspense>
    )
}

export default App
