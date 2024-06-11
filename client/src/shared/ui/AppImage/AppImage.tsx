import { classNames } from '@/shared/lib/classNames/classNames'
import * as cls from '@/shared/ui/AppImage/AppImage.module.scss'
import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    loadingFallback?: ReactElement
    errorFallback?: ReactElement
}

export const AppImage = (props: ImageProps) => {
    const {
        className,
        src,
        alt,
        loadingFallback,
        errorFallback,
        ...restProps
    } = props

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const image = new Image()
        image.src = src
        image.onload = () => setIsLoading(false)
        image.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading && loadingFallback) {
        return loadingFallback
    }

    if (hasError && errorFallback) {
        return loadingFallback
    }

    return (
        <img
            className={classNames(cls.Image, {}, [className])}
            src={src}
            alt={alt}
            {...restProps}
        />
    )
}
