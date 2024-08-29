import type { Variants } from 'framer-motion'

export enum BaseAnimationVariants {
    hidden = 'hidden',
    visible = 'visible',
    exit = 'exit',
}

type BaseVariantKeys = keyof typeof BaseAnimationVariants
export type CommonAnimationVariants = Record<BaseVariantKeys, Variants[keyof Variants]>
