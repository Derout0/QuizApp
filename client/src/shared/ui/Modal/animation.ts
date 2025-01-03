import type { AnimationList } from '@/shared/consts/animation'
import { DefaultVariants } from '@/shared/consts/animation'

export const baseModalVariants: AnimationList = {
    [DefaultVariants.HIDDEN]: {
        opacity: 0,
        y: -20,
        scale: 0.98,
    },
    [DefaultVariants.VISIBLE]: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.25,
        },
    },
    [DefaultVariants.EXIT]: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        transition: {
            ease: 'easeOut',
            duration: 0.25,
        },
    },
}
