import * as cls from './Ripple.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useState, MouseEvent, useEffect, ReactNode, useRef, useCallback } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Ripple } from '@/shared/ui/Ripple/Ripple'

interface RippleRootProps {
    className?: string
    children?: ReactNode
    timeout?: { enter: number, exit: number }
    color?: string
}

export const RippleRoot = (props: RippleRootProps) => {
    const {
        className,
        children,
        timeout = { enter: 500, exit: 500 },
        color = '#000',
    } = props

    const [rippleArray, setRippleArray] = useState<ReactNode[]>([])
    const [nextKey, setNextKey] = useState(0)

    const timerRef = useRef<number | undefined>(undefined)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let bounce: number | undefined

        if (rippleArray.length > 0) {
            window.clearTimeout(bounce)

            bounce = window.setTimeout(() => {
                setRippleArray([])
                window.clearTimeout(bounce)
            }, timeout.exit * 1.2)
        }

        return () => window.clearTimeout(bounce)
    }, [rippleArray.length, timeout])

    const createRipple = useCallback(
        (rippleX: number, rippleY: number, size: number) => {
            const newRipple = (
                <Ripple
                    timeout={timeout}
                    color={color}
                    key={nextKey}
                    rippleX={rippleX}
                    rippleY={rippleY}
                    size={size}
                />
            )
            setRippleArray(prev => [...prev, newRipple])
            setNextKey(prev => prev + 1)
        },
        [color, nextKey, timeout],
    )

    const start = useCallback((event: MouseEvent) => {
        const element = containerRef.current

        const rect = element?.getBoundingClientRect() || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = window.setTimeout(() => {
            setRippleArray(prev => prev.slice(1))
            timerRef.current = undefined
        }, timeout.exit)

        const clientX = event.clientX
        const clientY = event.clientY
        const rippleX = Math.round(clientX - rect.left)
        const rippleY = Math.round(clientY - rect.top)

        const size = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3)
        createRipple(rippleX, rippleY, size)
    }, [createRipple, timeout.exit])

    // const stop = useCallback(() => {
    //     if (timerRef.current) {
    //         clearTimeout(timerRef.current)
    //         timerRef.current = undefined
    //     }
    // }, [])

    return (
        <div
            className={classNames(cls.RippleRoot, {}, [className])}
            onMouseDown={start}
            // onMouseUp={stop}
            ref={containerRef}
        >
            {children}
            <TransitionGroup enter exit>
                {rippleArray}
            </TransitionGroup>
        </div>
    )
}
