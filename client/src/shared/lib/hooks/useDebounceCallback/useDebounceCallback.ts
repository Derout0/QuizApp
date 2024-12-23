import { useMemo } from 'react'
import { useEvent } from '@/shared/lib/hooks'
import { debounce } from '@/shared/lib/utils/debounce'

export const useDebounceCallback = <Params extends unknown[], Return>(
    callback: (...args: Params) => Return,
    delay: number,
) => {
    const internalCallback = useEvent(callback)
    return useMemo(() => debounce(internalCallback, delay), [delay])
}
