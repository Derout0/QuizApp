import * as cls from './Overlay.module.scss'
import { motion } from 'framer-motion'

import { classNames } from '@/shared/lib/classNames/classNames'

interface OverlayProps {
    className?: string
    onClick?: () => void
}

export const Overlay = (props: OverlayProps) => {
    const {
        className,
        onClick,
    } = props

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(cls.Overlay, {}, [className])}
            onClick={onClick}
        />
    )
}
