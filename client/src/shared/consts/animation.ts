import type { Variants } from 'framer-motion'

export enum DefaultVariants {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
    EXIT = 'exit',
}

export type AnimationList<T extends keyof Variants = DefaultVariants> = Record<T, Variants[T]>
