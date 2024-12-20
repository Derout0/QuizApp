import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from '../useEvent/useEvent'
import { getElement } from '../../utils/getElement'

export type UseInfiniteScrollTarget = (() => Element) | Element | Window | RefObject<Element | null>

export interface UseInfiniteScrollOptions {
    direction?: 'bottom' | 'left' | 'right' | 'top'
    distance?: number
}

export interface UseInfiniteScroll {
    <Target extends UseInfiniteScrollTarget>(
        target: Target,
        callback: (event: Event) => void,
        options?: UseInfiniteScrollOptions
    ): boolean

    <Target extends UseInfiniteScrollTarget>(
        callback: (event: Event) => void,
        options?: UseInfiniteScrollOptions,
        target?: never
    ): {
        ref: (node: Target) => void
        isLoading: boolean
    }
}

export const useInfiniteScroll = ((...params) => {
    const target = params[1] instanceof Function ? (params[0] as UseInfiniteScrollTarget) : undefined
    const callback = params[1] instanceof Function ? params[1] : (params[0] as () => void)
    const options = (
        params[1] instanceof Function ? params[2] : params[1]
    ) as UseInfiniteScrollOptions

    const direction = options?.direction ?? 'bottom'
    const distance = options?.distance ?? 10

    const [isLoading, setIsLoading] = useState(false)
    const [internalRef, setInternalRef] = useState<Element>()
    const internalCallbackRef = useRef(callback)
    internalCallbackRef.current = callback

    const onLoadMore = useEvent(async (event: Event) => {
        if (isLoading) return

        let distances

        if (target === window) {
            const scrollBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
            const scrollRight = document.documentElement.scrollWidth - (window.scrollX + window.innerWidth)

            distances = {
                bottom: scrollBottom,
                top: window.scrollY,
                right: scrollRight,
                left: window.scrollX,
            }
        } else {
            const {
                clientHeight,
                scrollHeight,
                scrollTop,
                clientWidth,
                scrollWidth,
                scrollLeft,
            } = (event.target || internalRef) as Element

            const scrollBottom = scrollHeight - (scrollTop + clientHeight)
            const scrollRight = scrollWidth - (scrollLeft + clientWidth)

            distances = {
                bottom: scrollBottom,
                top: scrollTop,
                right: scrollRight,
                left: scrollLeft,
            }
        }

        if (distances[direction] <= distance) {
            setIsLoading(true)
            await internalCallbackRef.current(event)
            setIsLoading(false)
        }
    })

    useEffect(() => {
        if (!target && !internalRef) return
        const element = (target ? getElement(target) : internalRef) as Element
        if (!element) return

        element.addEventListener('scroll', onLoadMore)

        return () => {
            element.removeEventListener('scroll', onLoadMore)
        }
    }, [internalRef, target, direction, distance])

    if (target) return isLoading

    return {
        ref: setInternalRef,
        isLoading,
    }
}) as UseInfiniteScroll
