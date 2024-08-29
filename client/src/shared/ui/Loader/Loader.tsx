import * as cls from './Loader.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'

type LoaderPosition = 'start' | 'center' | 'end'

interface LoaderProps {
    className?: string
    position?: LoaderPosition
}

export const Loader = (props: LoaderProps) => {
    const {
        className,
        position = 'start',
    } = props

    const mods: Mods = {
        [cls[position]]: position,
    }

    return (
        <div className={classNames(cls.Loader, mods, [className])}>
            <span className={cls.inner}></span>
        </div>
    )
}
