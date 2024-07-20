import * as cls from './Modal.module.scss'
import { ReactNode } from 'react'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { Portal } from '@/shared/ui/Portal/Portal'

interface ModalProps {
    className?: string
    children?: ReactNode
    onClose: () => void
    isOpen: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
    } = props

    const mods: Mods = {
        [cls.open]: isOpen,
    }

    if (!isOpen) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={onClose} />
                <div className={cls.inner}>
                    {children}
                </div>
            </div>
        </Portal>

    )
}
