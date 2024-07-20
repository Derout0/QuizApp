import { Variants } from 'framer-motion'

export enum BaseVariants {
    hidden = 'hidden',
    visible = 'visible',
    exit = 'exit',
}

type BaseVariantKeys = keyof typeof BaseVariants
type ModalVariants = Record<BaseVariantKeys, Variants[keyof Variants]>

export const baseModalVariants: ModalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.15,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            ease: 'easeIn',
            duration: 0.15,
        },
    },
}
