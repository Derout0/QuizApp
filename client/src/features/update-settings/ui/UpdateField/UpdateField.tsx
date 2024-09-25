import { memo } from 'react'

import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

export interface UpdateFieldProps {
    label: string
    data: string
    newData: string
    editing: boolean
    onEdit: () => void
    onChange: (value: string) => void
    onSave: () => void
    onCancel: () => void
}

export const UpdateField = memo((props: UpdateFieldProps) => {
    const {
        label,
        data,
        newData,
        editing,
        onEdit,
        onChange,
        onSave,
        onCancel,
    } = props

    if (editing) {
        return (
            <HStack gap="20" justify="space-between">
                <VStack gap="8">
                    <Text>{label}</Text>
                    <Input autoComplete="off" label={label} value={newData} onChange={onChange} />
                </VStack>
                <HStack gap="12">
                    <Button theme="filled" onClick={onSave}>Сохранить</Button>
                    <Button theme="filled" onClick={onCancel}>Отмена</Button>
                </HStack>
            </HStack>
        )
    }

    return (
        <HStack gap="20" justify="space-between">
            <VStack gap="8">
                <Text>{label}</Text>
                <Text>{data ? data : 'Не указано'}</Text>
            </VStack>
            <Button theme="filled" onClick={onEdit}>Редактировать</Button>
        </HStack>
    )
})
