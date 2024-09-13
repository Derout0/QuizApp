import * as cls from './Text.module.scss'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { createElement, type ReactNode } from 'react'

import {
    type TextColor,
    type TextFW,
    type TextLH,
    type TextSize,
    type TextType,
    type TextAlign,
    TextTheme,
} from './types'

type excludeTextType = Omit<TextProps, 'type'>
type excludeForTitles = Omit<excludeTextType, 'theme'>

interface TextSX {
    size?: TextSize
    lineHeight?: TextLH
    fontWeight?: TextFW
    color?: TextColor
}

interface TextProps {
    className?: string
    children?: ReactNode
    sx?: TextSX
    theme?: TextTheme
    type?: TextType
    align?: TextAlign
    noWrap?: boolean
}

export const Text = (props: TextProps) => {
    const {
        className,
        children,
        theme,
        sx = {},
        type = 'div',
        align,
        noWrap,
    } = props

    const {
        size,
        lineHeight,
        fontWeight,
        color,
    } = sx

    const additional: string[] = [
        className,
        (theme && cls[theme]),
        (size && cls[size]),
        (lineHeight && cls[lineHeight]),
        (fontWeight && [cls[`fw-${fontWeight}`]]),
        (color && [cls[color]]),
        (align && cls[align]),
    ]

    const mods: Mods = {
        [cls.noWrap]: noWrap,
    }

    return createElement(type, { className: classNames(cls.Text, mods, additional) }, children)
}

Text.H1 = (props: excludeForTitles) => <Text {...props} type="h1" theme={TextTheme.titleH1} />
Text.H2 = (props: excludeForTitles) => <Text {...props} type="h2" theme={TextTheme.titleH2} />
Text.H3 = (props: excludeForTitles) => <Text {...props} type="h3" theme={TextTheme.titleH3} />
Text.H4 = (props: excludeForTitles) => <Text {...props} type="h4" theme={TextTheme.titleH4} />
Text.P = (props: excludeTextType) => <Text {...props} type="p" theme={TextTheme.TEXT} />
Text.SPAN = (props: excludeTextType) => <Text {...props} type="span" />
Text.DIV = (props: excludeTextType) => <Text {...props} type="div" />
