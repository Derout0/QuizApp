import { CommonAnimationVariants } from '@/shared/consts/animation'

export const baseModalVariants: CommonAnimationVariants = {
    hidden: {
        opacity: 0,
        y: -20,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.25,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        transition: {
            ease: 'easeOut',
            duration: 0.25,
        },
    },
}
