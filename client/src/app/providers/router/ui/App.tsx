import React, { Suspense } from 'react'
import { Navbar } from '@/widgets/Navbar/ui/Navbar/Navbar'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar/Sidebar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { AppPage } from './AppPage'

const App = () => {
    return (
        <Suspense fallback={<div>Loading for language...</div>}>
            <VStack className="App">
                <HStack flexGrow={1} className="AppInner">
                    <Sidebar />
                    <VStack as="main" className="AppMain">
                        <Navbar />
                        <AppPage />
                    </VStack>
                </HStack>
            </VStack>
        </Suspense>
    )
}

export default App
