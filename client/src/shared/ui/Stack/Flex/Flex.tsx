import * as cls from './Flex.module.scss'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import type { CSSProperties } from 'react'
import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode, useMemo } from 'react'

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type FlexJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-evenly'
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch'
export type FlexDirection = 'column' | 'row'
export type Gap = '4' | '8' | '12' | '16' | '20' | '24' | '28' | '32' | '36' | '40'

const justifyClasses: Record<FlexJustify, string> = {
    'start': cls.justifyStart,
    'center': cls.justifyCenter,
    'end': cls.justifyEnd,
    'space-between': cls.justifySpaceBetween,
    'space-evenly': cls.justifySpaceEvenly,
}

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
    stretch: cls.alignStretch,
}

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
}

const gapClasses: Record<Gap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    12: cls.gap12,
    16: cls.gap16,
    20: cls.gap20,
    24: cls.gap24,
    28: cls.gap28,
    32: cls.gap32,
    36: cls.gap36,
    40: cls.gap40,
}

export interface FlexProps extends DivProps {
    className?: string
    children: ReactNode
    as?: keyof JSX.IntrinsicElements
    justify?: FlexJustify
    align?: FlexAlign
    direction?: FlexDirection
    flexGrow?: number
    flexShrink?: number
    flexBasis?: number
    flex?: string
    gap?: Gap
    maxWidth?: boolean
    padding?: string
    margin?: string
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        as: Component = 'div',
        justify,
        align,
        direction,
        flexGrow,
        flexShrink,
        flexBasis,
        flex,
        gap,
        maxWidth,
        padding,
        margin,
    } = props

    const styles: CSSProperties = useMemo<CSSProperties>(() => {
        return {
            ...(flex ? { flex } : { flexGrow, flexBasis, flexShrink }),
            padding,
            margin,
        }
    }, [flex, flexShrink, flexBasis, flexGrow, padding, margin])

    const additional = [
        className,
        justify && justifyClasses[justify],
        align && alignClasses[align],
        direction && directionClasses[direction],
        gap && gapClasses[gap],
    ]

    const mods: Mods = {
        [cls.maxWidth]: maxWidth,
    }

    const s = { ...styles }

    console.log(s)

    return (
        <Component className={classNames(cls.Flex, mods, additional)} style={{ ...styles }}>
            {children}
        </Component>
    )
}
