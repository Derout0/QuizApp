import * as cls from './CardFlip.module.scss'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

interface CardFlipProps {
    className?: string
    containerZIndex?: string
    isFlipped: boolean
    flipSpeed?: number
    infinite?: boolean
    flipDirection?: 'horizontal' | 'vertical'
    children: [ReactNode, ReactNode]
}

export const CardFlip = (props: CardFlipProps) => {
    const {
        className,
        containerZIndex = 'auto',
        isFlipped = false,
        flipSpeed = 1,
        flipDirection = 'horizontal',
        infinite = false,
        children,
    } = props

    const [isFlippedCard, setFlippedCard] = useState<boolean>(false)
    const [rotation, setRotation] = useState<number>(0)

    useEffect(() => {
        if (isFlipped !== isFlippedCard) {
            setFlippedCard(isFlipped)
            setRotation(prev => prev + 180)
        }
    }, [isFlipped])

    const getChildren = (key: 0 | 1) => {
        if (children.length !== 2) throw new Error('CardFlip requires two children')
        return children[key]
    }

    const frontRotateY = `rotateY(${infinite ? rotation : isFlipped ? 180 : 0}deg)`
    const backRotateY = `rotateY(${infinite ? rotation + 180 : isFlipped ? 0 : -180}deg)`
    const frontRotateX = `rotateX(${infinite ? rotation : isFlipped ? 180 : 0}deg)`
    const backRotateX = `rotateX(${infinite ? rotation + 180 : isFlipped ? 0 : -180}deg)`

    const styles: Record<string, CSSProperties> = {
        container: {
            zIndex: containerZIndex,
        },
        inner: {
            height: '100%',
            perspective: '1000px',
            position: 'relative',
            width: '100%',
        },
        back: {
            position: isFlipped ? 'relative' : 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
            transformStyle: 'preserve-3d',
            transition: `${flipSpeed}s`,
            zIndex: isFlipped ? '2' : '1',
        },
        front: {
            position: isFlipped ? 'absolute' : 'relative',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
            transformStyle: 'preserve-3d',
            transition: `${flipSpeed}s`,
            zIndex: '2',
        },
    }

    return (
        <div
            className={classNames(cls.CardFlip, {}, [className])}
            style={styles.container}
        >
            <div style={styles.inner}>
                <div style={styles.front}>
                    {getChildren(0)}
                </div>
                <div style={styles.back}>
                    {getChildren(1)}
                </div>
            </div>
        </div>
    )
}
