import * as cls from '../../UpdateField.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { animation } from '@/features/update-settings/lib/animation/animation'
import { DefaultVariants } from '@/shared/consts/animation'
import { Input } from '@/shared/ui/Input/Input'
import { Text } from '@/shared/ui/Text/Text'

interface UpdateFieldInformationProps {
    editing: boolean
    inputLabel?: string
    inputPlaceholder?: string
    data: string | number
    newData: string | number
    onChange: (value: string) => void
}

export const UpdateFieldInformation = (props: UpdateFieldInformationProps) => {
    const {
        editing,
        inputLabel,
        inputPlaceholder,
        data,
        newData,
        onChange,
    } = props

    return (
        <AnimatePresence initial={false} mode="wait">
            {editing
                ? (
                    <motion.div
                        key="input"
                        variants={animation}
                        initial={DefaultVariants.HIDDEN}
                        animate={DefaultVariants.VISIBLE}
                        exit={DefaultVariants.EXIT}
                    >
                        <Input
                            theme="border"
                            label={inputLabel}
                            placeholder={inputPlaceholder}
                            value={String(newData)}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </motion.div>
                )
                : (
                    <motion.div
                        key="text"
                        variants={animation}
                        initial={DefaultVariants.HIDDEN}
                        animate={DefaultVariants.VISIBLE}
                        exit={DefaultVariants.EXIT}
                    >
                        <Text className={cls.data} sx={{ fontSize: 'body-l', fontWeight: '500' }}>
                            {data ? data : 'Не указано'}
                        </Text>
                    </motion.div>
                )}
        </AnimatePresence>
    )
}
