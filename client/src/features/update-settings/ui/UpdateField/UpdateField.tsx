import * as cls from './UpdateField.module.scss'
import type { FormEvent } from 'react'
import { memo } from 'react'

import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { UpdateFieldInformation } from './components/UpdateFieldInformation/UpdateFieldInformation'
import { UpdateFieldsControls } from './components/UpdateFieldControls/UpdateFieldsControls'

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

    return (
        <form className={cls.UpdateField} onSubmit={onFormSubmit}>
            <HStack gap="20" justify="space-between" align="center">
                <VStack className={cls.content} gap="8" flexGrow={1}>
                    <Text sx={{ fontSize: 'label-l', fontWeight: '500' }}>{label}</Text>
                    <UpdateFieldInformation
                        editing={editing}
                        inputLabel={inputLabel}
                        inputPlaceholder={inputPlaceholder}
                        data={data}
                        newData={newData}
                        onChange={onChange}
                    />
                </VStack>
                <HStack gap="12">
                    <UpdateFieldsControls editing={editing} onEdit={onEdit} onCancel={onCancel} />
                </HStack>
            </HStack>
        </form>
    )
})
