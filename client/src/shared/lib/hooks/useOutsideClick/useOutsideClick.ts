import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

export const useOutsideClick = (
    ref: MutableRefObject<HTMLElement | null>,
    callback: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref, callback])
}
