import { useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateSettingsActions } from '@/features/update-settings'
import { useAppDispatch } from '@/shared/lib/hooks'
import { getUpdateEditableField } from '../../../model/selectors/getUpdateSettingsSelectors'

export interface InitialField {
    id: string
    label: string
    inputLabel?: string
    inputPlaceholder?: string
    data: string | number
    newData: string | number
    onCheck?: () => void
    onChange: (value: string) => void
    onSave?: () => void
    onCancel?: () => void
}

interface ReturnedInitialField extends InitialField {
    editing: boolean
    onEdit: () => void
    onSave: () => void
    onCancel: () => void
}

interface FieldManager {
    initialFields: InitialField[]
    onSaveEdit?: () => void
    onCancelEdit?: () => void
}

interface ReturnedFieldManager {
    fields: ReturnedInitialField[]
    setField: () => void
}

/**
 * Хук для управления полями формы, предоставляющий функциональность редактирования, сохранения и отмены изменений.
 *
 * @param {Object} props - Параметры.
 * @param {Array<Object>} props.initialFields - Список полей для управления.
 * @param {string} [props.initialFields[].id] - Уникальный идентификатор поля.
 * @param {string} [props.initialFields[].label] - Название поля (например, "Username").
 * @param {string} [props.initialFields[].inputLabel] - Кастомный label для поля ввода.
 * @param {string} [props.initialFields[].inputPlaceholder] - Placeholder для поля ввода.
 * @param {string} [props.initialFields[].data] - Исходное значение поля.
 * @param {string} [props.initialFields[].newData] - Новое значение поля (во время редактирования).
 * @param {Function} [props.initialFields[].onCheck] - Функция вызывываемая при редактировании. (например: для проверки пароля перед получением доступа к полу ввода).
 * @param {Function} [props.initialFields[].onChange] - Функция для обработки изменений значения поля.
 * @param {Function} [props.initialFields[].onSave] - Функция для обработки сохранения изменений конкретного поля.
 * @param {Function} [props.initialFields[].onCancel] - Функция для обработки отмены изменений конкретного поля.
 * @param {Function} [props.onSaveEdit] - Функция для общего сохранения, вызываемая, если поле не имеет собственного обработчика сохранения.
 * @param {Function} [props.onCancelEdit] - Функция для общей отмены, вызываемая, если поле не имеет собственного обработчика отмены.
 *
 * @returns {Object} - Объект, содержащий:
 *  - {Array<Object>} fields - Массив объектов полей с дополнительными свойствами:
 *      - {boolean} editing - Флаг, показывающий, находится ли поле в режиме редактирования.
 *      - {Function} onEdit - Функция для активации режима редактирования.
 *      - {Function} onSave - Функция для сохранения изменений.
 *      - {Function} onCancel - Функция для отмены изменений.
 *  - {Function} setField - Функция для установки редактируемого поля.
 *
 * @example
 * const fields = useFieldManager({
 *   initialFields: [
 *     {
 *       id: 'username',
 *       label: 'Username',
 *       data: user?.username || '',
 *       newData: updated.username,
 *       onChange: onChangeUsername,
 *       onSave: () => console.log('Сохранить изменения для username')
 *     }
 *   ],
 *   onSaveEdit: () => dispatch(update),
 *   onCancelEdit: () => console.log('Общая отмена')
 * });
 */

export const useFieldManager = (props: FieldManager): ReturnedFieldManager => {
    const {
        initialFields,
        onSaveEdit,
        onCancelEdit,
    } = props

    const dispatch = useAppDispatch()
    const selectedID = useRef<string | null>(null)

    const editableField = useSelector(getUpdateEditableField)

    const setField = useCallback(() => {
        dispatch(updateSettingsActions.clearEditableField())
        dispatch(updateSettingsActions.setEditableField(selectedID.current))
    }, [dispatch, selectedID])

    const onEditHandler = useCallback((field: InitialField) => {
        const { id, onCheck } = field
        selectedID.current = id

        if (onCheck) {
            onCheck?.()
            return
        }

        setField()
    }, [setField])

    const onSaveHandler = useCallback((field: InitialField) => {
        field.onSave ? field.onSave() : onSaveEdit?.()
    }, [onSaveEdit])

    const onCancelHandler = useCallback((field: InitialField) => {
        field.onCancel ? field.onCancel() : onCancelEdit?.()
    }, [onCancelEdit])

    const fields = useMemo(() => {
        return initialFields.map((field) => {
            const { id } = field

            const editing = editableField === id

            return {
                ...field,
                editing,
                onEdit: () => onEditHandler(field),
                onSave: () => onSaveHandler(field),
                onCancel: () => onCancelHandler(field),
            }
        })
    }, [editableField, initialFields, onCancelHandler, onEditHandler, onSaveHandler])

    return {
        fields,
        setField,
    }
}
