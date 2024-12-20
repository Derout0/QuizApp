import { useCallback, useRef } from 'react'

export const useEvent = <Params extends unknown[], Return>(
    callback: (...args: Params) => Return,
): ((...args: Params) => Return) => {
    const handlerRef = useRef<typeof callback>(callback)
    handlerRef.current = callback

    return useCallback((...args) => {
        const fn = handlerRef.current
        return fn(...args)
    }, [])
}
