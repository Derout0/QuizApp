import { useCallback } from 'react'
import { UpdateField } from '../UpdateField/UpdateField'
import type { UpdateFieldProps } from '../UpdateField/UpdateField'

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
            label,
            data,
            newData,
            editing,
            onEdit,
            onChange,
            onSave,
            onCancel,
        }, index) => (
            <UpdateField
                key={index}
                label={label}
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
        <>
            { getUserFields() }
        </>
    )
}
