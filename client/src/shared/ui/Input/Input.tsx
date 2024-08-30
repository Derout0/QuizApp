import * as cls from './Input.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Mods } from '@/shared/lib/classNames/classNames'

import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { memo } from 'react'

import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { Text } from '@/shared/ui/Text/Text'
import { useHover } from '@/shared/lib/hooks/useHover/useHover'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string
    onChange?: (value: string) => void
    label?: string
    error?: string
    disabled?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        label,
        error,
        type = 'text',
        disabled,
        ...other
    } = props

    const ref = useRef(null)

    const { isHover } = useHover(ref)
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.target.value

        onChange?.(targetValue)
    }

    const onFocusHandler = () => setIsFocus(true)
    const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
        const targetValue = event.target.value

        if (!targetValue) {
            setIsFocus(false)
        }
    }

    const InputLabel = () => {
        if (label) {
            return (
                <span className={cls.label}>{label}</span>
            )
        }
    }

    const InputError = () => {
        if (error) {
            return (
                <Text sx={{ color: 'error' }}>{error}</Text>
            )
        }
    }

    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.focused]: isFocus,
        [cls.hovered]: isHover,
    }

    return (
        <div ref={ref} className={classNames(cls.Input, mods, [className])}>
            <HStack gap="8" className={cls.fieldMain}>
                <div className={cls.inner}>
                    {InputLabel()}
                    <div className={cls.field}>
                        <input
                            className={cls.input}
                            onChange={onChangeHandler}
                            onFocus={onFocusHandler}
                            onBlur={onBlurHandler}
                            type={type}
                            value={value}
                            readOnly={disabled}
                            {...other}
                        />
                    </div>
                </div>
            </HStack>
            {InputError()}
        </div>
    )
})
