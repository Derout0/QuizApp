import * as cls from './Ripple.module.scss'
import { useState, useRef } from 'react'
import { Transition } from 'react-transition-group'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'

interface RippleProps {
    className?: string
    rippleX: number
    rippleY: number
    size: number
    timeout: { enter: number, exit: number }
    color: string
}

export const Ripple = (props: RippleProps) => {
    const {
        className,
        rippleX,
        rippleY,
        size,
        timeout,
        color,
        ...other
    } = props

    const rippleRef = useRef(null)
    const [rippleEntering, setRippleEntering] = useState(false)
    const [wrapperExiting, setWrapperExiting] = useState(false)

    const handleEnter = () => {
        console.log('RIPPLE ENTER')
        setRippleEntering(true)
    }

    const handleExit = () => {
        console.log('RIPPLE EXIT...')
        setWrapperExiting(true)
    }

    const modsRippleWrapper: Mods = {
        [cls['ripple-wrapper-exiting']]: wrapperExiting,
    }

    const modsRippleInner: Mods = {
        [cls['ripple-inner-entering']]: rippleEntering,
    }

    return (
        <Transition in nodeRef={rippleRef} onExit={handleExit} onEnter={handleEnter} timeout={timeout} {...other}>
            <span
                className={classNames(cls.RippleWrapper, modsRippleWrapper, [className])}
                style={{ animationDuration: `${timeout.exit}ms` }}
            >
                <span
                    className={classNames(cls.RippleInner, modsRippleInner)}
                    style={{
                        width: size,
                        height: size,
                        top: rippleY - (size / 2),
                        left: rippleX - (size / 2),
                        backgroundColor: color,
                        animationDuration: `${timeout.enter}ms`,
                    }}
                />
            </span>
        </Transition>
    )
}
