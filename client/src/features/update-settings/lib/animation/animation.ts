import type { AnimationList } from '@/shared/consts/animation'
import { DefaultVariants } from '@/shared/consts/animation'

export const animation: AnimationList = {
    [DefaultVariants.HIDDEN]: {
        opacity: 0,
        y: -15,
        transition: {
            duration: 0.1,
        },
    },
    [DefaultVariants.VISIBLE]: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
    [DefaultVariants.EXIT]: {
        opacity: 0,
        y: 15,
        transition: {
            duration: 0.1,
        },
    },
}
