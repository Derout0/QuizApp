import { useEffect, useState, type RefObject } from 'react'

export function useFocus<T extends HTMLElement = HTMLElement>(ref: RefObject<T>) {
    const [isFocus, setIsFocus] = useState(false)

    const onFocus = () => {
        setIsFocus(true)
    }

    const onBlur = () => {
        setIsFocus(false)
    }

    useEffect(() => {
        const element = ref.current

        if (element) {
            element.addEventListener('mouseover', onFocus)
            element.addEventListener('mouseout', onBlur)

            return () => {
                element.removeEventListener('mouseover', onFocus)
                element.removeEventListener('mouseout', onBlur)
            }
        }
    }, [ref])

    return { isFocus, setIsFocus }
}
