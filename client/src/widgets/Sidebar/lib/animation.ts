import type { AnimationList } from '@/shared/consts/animation'

export enum SidebarVariants {
    VISIBLE = 'visible',
    COLLAPSED = 'collapsed',
}

export const sidebarAnimation: AnimationList<SidebarVariants> = {
    [SidebarVariants.VISIBLE]: {
        width: '18.75rem',
        flexBasis: '18.75rem',
        transition: {
            ease: [0.25, 0, 0.75, 1],
            duration: 0.25,
        },
    },
    [SidebarVariants.COLLAPSED]: {
        width: '3.75rem',
        flexBasis: '3.75rem',
        transition: {
            ease: [0.25, 0, 0.75, 1],
            duration: 0.25,
        },
    },
}

export const titleAnimation: AnimationList<SidebarVariants> = {
    [SidebarVariants.VISIBLE]: {
        opacity: 1,
        height: 'auto',
        transform: 'translateY(0)',
        marginBottom: '0.625rem',
        display: 'block',
    },
    [SidebarVariants.COLLAPSED]: {
        opacity: 0,
        height: 0,
        transform: 'translateY(-10px)',
        marginBottom: 0,
        transitionEnd: {
            display: 'none',
        },
    },
}
