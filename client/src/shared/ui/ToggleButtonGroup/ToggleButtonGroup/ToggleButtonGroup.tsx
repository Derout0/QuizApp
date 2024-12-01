import type { ComponentPropsWithoutRef, ReactNode, FocusEvent } from 'react'
import { useMemo, useRef, useState, useCallback, createContext } from 'react'

export const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
    register: (value: string, element: HTMLElement) => void
    deregister: (value: string) => void
    getItems: () => ButtonItem[]
    setFocusedValue: (id: string) => void
    focusedValue: string | null
    onShiftTab: () => void
}>({
            value: null,
            onChange: () => {},
            register: () => {},
            deregister: () => {},
            getItems: () => [],
            setFocusedValue: () => {},
            focusedValue: null,
            onShiftTab: () => {},
        })

type PropsWithLabelBy = {
    ['aria-labelledby']: string
}

type PropsWithLabel = {
    ['aria-label']: string
}

export type ButtonItem = { value: string, element: HTMLElement }

interface ToggleGroupRootBase {
    children: ReactNode | ReactNode[]
    value: string | null
    onChange: (value: string) => void
}

type ToggleGroupRootProps = (PropsWithLabel | PropsWithLabelBy)
  & ToggleGroupRootBase
  & Omit<ComponentPropsWithoutRef<'div'>, keyof ToggleGroupRootBase>

export const ToggleButtonGroup = (props: ToggleGroupRootProps) => {
    const {
        children,
        value,
        onChange,
        ...other
    } = props

    const ref = useRef<HTMLDivElement>(null)
    const elements = useRef<Map<string, HTMLElement>>(new Map())
    const [focusedValue, setFocusedValue] = useState<string | null>(value)
    const [isShiftTabbing, setIsShiftTabbing] = useState<boolean>(false)

    const getItems = useCallback(() => {
        if (!ref.current) return []

        const domElements = Array.from(ref.current.querySelectorAll('[data-toggle-group-button]'))

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([value, element]) => ({ value, element }))
    }, [])

    const providerValue = useMemo(() => ({
        value,
        onChange,
        getItems,
        focusedValue,
        register: (value: string, element: HTMLElement) => {
            elements.current.set(value, element)
        },
        deregister: (value: string) => {
            elements.current.delete(value)
        },
        setFocusedValue: (id: string) => {
            setFocusedValue(id)
        },
        onShiftTab: () => {
            setIsShiftTabbing(true)
        },
    }), [value, onChange, getItems, focusedValue])

    const onFocus = (event: FocusEvent) => {
        if (event.target !== event.currentTarget) return
        const orderedItems = getItems()

        if (value) {
            elements.current.get(value)?.focus()
        } else {
            orderedItems.at(0)?.element.focus()
        }
    }

    const onBlur = () => setIsShiftTabbing(false)

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                ref={ref}
                role="radiogroup"
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={onFocus}
                onBlur={onBlur}
                {...other}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    )
}
