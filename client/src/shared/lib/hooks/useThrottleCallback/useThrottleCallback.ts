import { useCallback, useEffect, useRef } from 'react'
import { throttle } from '@/shared/lib/utils/throttle'

export const useThrottleCallback = <Params extends any[]>(
    callback: (...args: Params) => void,
    delay: number,
): ((...args: Params) => void) => {
    const callbackRef = useRef(callback)
    callbackRef.current = callback

    const throttledCallback = useRef(
        throttle((...args: Params) => callbackRef.current(...args), delay),
    )

    useEffect(() => {
        throttledCallback.current = throttle(
            (...args: Params) => callbackRef.current(...args),
            delay,
        )
    }, [delay])

    return useCallback((...args: Params) => {
        throttledCallback.current(...args)
    }, [])
}
