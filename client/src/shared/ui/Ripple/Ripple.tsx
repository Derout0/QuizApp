import * as cls from './Ripple.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface RippleProps {
    className?: string
}
export const Ripple = (props: RippleProps) => {
    const {
        className,
    } = props

    return (
        <div className={classNames(cls.Ripple, {}, [className])}>

        </div>
    )
}
