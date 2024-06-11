import { Suspense } from 'react'
import { AppRouter } from '@/app/providers/router'
import { Navbar } from '@/widgets/Navbar/ui/Navbar'

const App = () => {
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
