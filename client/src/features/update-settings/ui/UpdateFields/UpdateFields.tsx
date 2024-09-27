import * as cls from './UpdateFields.module.scss'
import { useCallback } from 'react'
import { UpdateField } from '../UpdateField/UpdateField'
import type { UpdateFieldProps } from '../UpdateField/UpdateField'
import { VStack } from '@/shared/ui/Stack'

interface UpdateFieldsProps {
    fields: UpdateFieldProps[]
}

export const UpdateFields = (props: UpdateFieldsProps) => {
    const {
        fields,
    } = props

    const getUserFields = useCallback(() => {
        if (!fields) return

        return fields.map(({
            id,
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
        }) => (
            <UpdateField
                id={id}
                key={id}
                label={label}
                inputLabel={inputLabel}
                inputPlaceholder={inputPlaceholder}
                data={data}
                newData={newData}
                editing={editing}
                onEdit={onEdit}
                onChange={onChange}
                onSave={onSave}
                onCancel={onCancel}
            />
        ))
    }, [fields])

    return (
        <VStack className={cls.UpdateFields}>
            { getUserFields() }
        </VStack>
    )
}
