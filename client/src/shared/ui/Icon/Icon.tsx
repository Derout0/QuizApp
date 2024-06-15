import * as cls from './Icon.module.scss'
import { FC, SVGProps } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string
    SVG: FC<SVGProps<SVGSVGElement>>
}

export const Icon = (props: IconProps) => {
    const { className, SVG, ...restProps } = props

    return (
        <SVG className={classNames(cls.Icon, {}, [className])} {...restProps} />
    )
}
