import * as cls from './UpdateField.module.scss'
import type { FormEvent } from 'react'
import { memo } from 'react'

import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

export interface UpdateFieldProps {
    id: string
    label: string
    inputLabel?: string
    inputPlaceholder?: string
    data: string | number
    newData: string | number
    editing: boolean
    onEdit: () => void
    onChange: (value: string) => void
    onSave: () => void
    onCancel: () => void
}

export const UpdateField = memo((props: UpdateFieldProps) => {
    const {
        label,
        inputLabel,
        inputPlaceholder,
        data,
        newData,
        editing,
        onEdit,
        onChange,
        onSave,
        onCancel,
    } = props

    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (editing) {
            onSave()
        }
    }

    if (editing) {
        return (
            <form className={cls.UpdateField} onSubmit={onFormSubmit}>
                <HStack gap="20" justify="space-between" align="center">
                    <VStack className={cls.content} gap="8" flexGrow={1}>
                        <Text sx={{ fontSize: 'label-l', fontWeight: '500' }}>{label}</Text>
                        <Input
                            theme="border"
                            label={inputLabel}
                            placeholder={inputPlaceholder}
                            value={String(newData)}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </VStack>
                    <HStack gap="12">
                        <Button theme="filled" type="submit">Сохранить</Button>
                        <Button theme="filled" onClick={onCancel}>Отмена</Button>
                    </HStack>
                </HStack>
            </form>
        )
    }

    return (
        <HStack className={cls.UpdateField} gap="20" justify="space-between" align="center">
            <VStack gap="8">
                <Text sx={{ fontSize: 'label-l', fontWeight: '500' }}>{label}</Text>
                <Text sx={{ fontSize: 'title-m', fontWeight: '600' }}>{data ? data : 'Не указано'}</Text>
            </VStack>
            <Button theme="filled" onClick={onEdit}>Редактировать</Button>
        </HStack>
    )
})
