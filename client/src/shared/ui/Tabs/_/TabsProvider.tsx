import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

interface TabsContextProps {
    currentIndex: string | number
    setCurrentIndex: Dispatch<SetStateAction<string | number>>
}

interface TabsProviderProps {
    children: ReactNode
}

const initialContext: TabsContextProps = {
    currentIndex: 0,
    setCurrentIndex: () => {},
}

const TabsContext = createContext<TabsContextProps>(initialContext)

export const TabsProvider = (props: TabsProviderProps) => {
    const { children } = props

    const [currentIndex, setCurrentIndex] = useState<string | number>(0)

    return (
        <TabsContext.Provider value={{ currentIndex, setCurrentIndex }}>
            {children}
        </TabsContext.Provider>
    )
}

export const useTabsContext = (): TabsContextProps => {
    const context = useContext(TabsContext)
    if (context === undefined) {
        throw new Error('useTabs must be used within a TabsProvider')
    }
    return context
}
