import { Suspense } from 'react'
import { AppRouter } from '@/app/providers/router'
import { Navbar } from '@/widgets/Navbar/ui/Navbar/Navbar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar/Sidebar'

const App = () => {
    return (
        <Suspense fallback={<div>Loading for language...</div>}>
            <VStack className="App">
                <HStack flexGrow={1} className="AppInner">
                    <Sidebar />
                    <VStack as="main" className="AppMain">
                        <Navbar />
                        <AppRouter />
                    </VStack>
                </HStack>
            </VStack>
        </Suspense>
    )
}

export default App
