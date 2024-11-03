import * as cls from '../../UpdateField.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

import { animation } from '@/features/update-settings/lib/animation/animation'

import ConfirmIcon from '@/shared/assets/icons/Check.svg'
import CancelIcon from '@/shared/assets/icons/Cross.svg'
import EditIcon from '@/shared/assets/icons/Pencil.svg'

import { DefaultVariants } from '@/shared/consts/animation'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { HStack } from '@/shared/ui/Stack'
import { memo } from 'react'

interface UpdateFieldsControlsProps {
    editing: boolean
    onEdit: () => void
    onCancel: () => void
}

// TODO: Fix EditButton on mobile
export const UpdateFieldsControls = memo((props: UpdateFieldsControlsProps) => {
    const {
        editing,
        onEdit,
        onCancel,
    } = props

    return (
        <AnimatePresence mode="wait" initial={false}>
            {editing
                ? (
                    <>
                        <motion.div
                            key="confirm"
                            initial={DefaultVariants.HIDDEN}
                            animate={DefaultVariants.VISIBLE}
                            exit={DefaultVariants.EXIT}
                            variants={animation}
                        >
                            <IconButton theme="tonal" type="submit">
                                <Icon SVG={ConfirmIcon} />
                            </IconButton>
                        </motion.div>
                        <motion.div
                            key="cancel"
                            initial={DefaultVariants.HIDDEN}
                            animate={DefaultVariants.VISIBLE}
                            exit={DefaultVariants.EXIT}
                            variants={animation}
                        >
                            <IconButton theme="outlined" onClick={onCancel}>
                                <Icon SVG={CancelIcon} />
                            </IconButton>
                        </motion.div>
                    </>
                )
                : (
                    <motion.div
                        key="edit"
                        initial={DefaultVariants.HIDDEN}
                        animate={DefaultVariants.VISIBLE}
                        exit={DefaultVariants.EXIT}
                        variants={animation}
                    >
                        <HStack className={cls.controls}>
                            <IconButton onClick={onEdit}>
                                <Icon SVG={EditIcon} />
                            </IconButton>
                        </HStack>
                    </motion.div>
                )}
        </AnimatePresence>
    )
})
