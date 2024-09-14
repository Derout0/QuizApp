import type { Variants } from 'framer-motion'

export enum SidebarVariants {
    VISIBLE = 'visible',
    COLLAPSED = 'collapsed',
}

export const sidebarAnimation: Variants = {
    visible: {
        width: '18.75rem',
        flexBasis: '18.75rem',
        transition: {
            ease: [0.25, 0, 0.75, 1],
            duration: 0.25,
        },
    },
    collapsed: {
        width: '3.75rem',
        flexBasis: '3.75rem',
        transition: {
            ease: [0.25, 0, 0.75, 1],
            duration: 0.25,
        },
    },
}

export const titleAnimation: Variants = {
    visible: {
        opacity: 1,
        height: 'auto',
        transform: 'translateY(0)',
        marginBottom: '0.625rem',
        display: 'block',
    },
    collapsed: {
        opacity: 0,
        height: 0,
        transform: 'translateY(-10px)',
        marginBottom: 0,
        transitionEnd: {
            display: 'none',
        },
    },
}
