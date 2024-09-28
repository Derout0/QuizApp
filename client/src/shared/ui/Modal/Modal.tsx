import * as cls from './Modal.module.scss'
import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { Portal } from '@/shared/ui/Portal/Portal'
import { DefaultVariants } from '@/shared/consts/animation'

import { baseModalVariants } from './animation'

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

    const modalElement = (
        isOpen && (
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={onClose} />
                {animate
                    ? (
                        <motion.div
                            className={cls.inner}
                            variants={animationVariants}
                            initial={DefaultVariants.HIDDEN}
                            animate={DefaultVariants.VISIBLE}
                            exit={DefaultVariants.EXIT}
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
    )

    return (
        <Portal>
            {
                animate
                    ? (
                        <AnimatePresence>
                            {
                                modalElement
                            }
                        </AnimatePresence>
                    )
                    : modalElement
            }
        </Portal>
    )
}

Modal.Header = ({ children }: { children: ReactNode }) => <div className={cls.header}>{children}</div>
Modal.Body = ({ children }: { children: ReactNode }) => <div className={cls.body}>{children}</div>
Modal.Footer = ({ children }: { children: ReactNode }) => <div className={cls.footer}>{children}</div>
