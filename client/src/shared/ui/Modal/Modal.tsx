import * as cls from './Modal.module.scss'
import { ReactNode } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { Portal } from '@/shared/ui/Portal/Portal'

import { baseModalVariants, BaseVariants } from './animation'

export interface ModalProps {
    className?: string
    children?: ReactNode
    animate?: boolean
    animationVariants?: Variants
    onClose: () => void
    isOpen: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        animate = true,
        animationVariants = baseModalVariants,
        onClose,
        isOpen,
    } = props

    const mods: Mods = {
        [cls.open]: isOpen,
    }

    return (
        <Portal>
            <AnimatePresence>
                {
                    isOpen && (
                        <div className={classNames(cls.Modal, mods, [className])}>
                            <Overlay onClick={onClose} />
                            {animate
                                ? (
                                    <motion.div
                                        className={cls.inner}
                                        variants={animationVariants}
                                        initial={BaseVariants.hidden}
                                        animate={BaseVariants.visible}
                                        exit={BaseVariants.exit}
                                    >
                                        {children}
                                    </motion.div>
                                )
                                : (
                                    <div className={cls.inner}>
                                        {children}
                                    </div>
                                )}
                        </div>
                    )
                }
            </AnimatePresence>
        </Portal>
    )
}
