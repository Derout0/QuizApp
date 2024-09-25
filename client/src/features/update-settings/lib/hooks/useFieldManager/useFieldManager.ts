import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { updateSettingsActions } from '@/features/update-settings'
import { useAppDispatch } from '@/shared/lib/hooks'
import { getUpdateEditableField } from '../../../model/selectors/getUpdateSettingsSelectors'

interface InitialFields {
    id: string
    label: string
    data: string
    newData: string
    onChange: (value: string) => void
    onSave?: () => void
    onCancel?: () => void
}

interface ReturnedInitialFields extends InitialFields {
    editing: boolean
    onEdit: () => void
    onSave: () => void
    onCancel: () => void
}

interface FieldManager {
    initialFields: InitialFields[]
    onSaveEdit?: () => void
    onCancelEdit?: () => void
}

/**
 * Хук для управления полями формы, предоставляющий функциональность редактирования, сохранения и отмены изменений.
 *
 * @param {Array} props.initialFields - Список полей, которые нужно управлять.
 * @param {string} props.initialFields[].id - Уникальный идентификатор поля.
 * @param {string} props.initialFields[].label - Название поля (например, "Username").
 * @param {string} props.initialFields[].data - Исходное значение поля.
 * @param {string} props.initialFields[].newData - Новое значение поля (во время редактирования).
 * @param {Function} props.initialFields[].onChange - Функция для обработки изменений значения поля.
 * @param {Function} [props.initialFields[].onSave] - Функция для обработки сохранения изменений конкретного поля.
 * @param {Function} [props.initialFields[].onCancel] - Функция для обработки отмены изменений конкретного поля.
 * @param {Function} [props.onSaveEdit] - Функция для общего сохранения, вызываемая, если поле не имеет своего собственного обработчика сохранения.
 * @param {Function} [props.onCancelEdit] - Функция для общей отмены, вызываемая, если поле не имеет своего собственного обработчика отмены.
 *
 * @returns {Array} Массив объектов полей с дополнительными свойствами:
 *  - {boolean} editing - Флаг, показывающий, находится ли поле в режиме редактирования.
 *  - {Function} onEdit - Функция для активации режима редактирования.
 *  - {Function} onSave - Функция для сохранения изменений.
 *  - {Function} onCancel - Функция для отмены изменений.
 *
 * @template
 * Пример использования:
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

export const useFieldManager = (props: FieldManager): ReturnedInitialFields[] => {
    const {
        initialFields,
        onSaveEdit,
        onCancelEdit,
    } = props

    const dispatch = useAppDispatch()

    const editableField = useSelector(getUpdateEditableField)

    const onEditHandler = useCallback((id: string) => {
        dispatch(updateSettingsActions.clearEditableField())
        dispatch(updateSettingsActions.setEditableField(id))
    }, [dispatch])

    const onSaveHandler = useCallback((field: InitialFields) => {
        field.onSave ? field.onSave() : onSaveEdit?.()
    }, [onSaveEdit])

    const onCancelHandler = useCallback((field: InitialFields) => {
        field.onCancel ? field.onCancel() : onCancelEdit?.()
    }, [onCancelEdit])

    const fields = useMemo(() => {
        return initialFields.map((field) => {
            const { id } = field

            const editing = editableField === id

            return {
                ...field,
                editing,
                onEdit: () => onEditHandler(id),
                onSave: () => onSaveHandler(field),
                onCancel: () => onCancelHandler(field),
            }
        })
    }, [editableField, initialFields, onCancelHandler, onEditHandler, onSaveHandler])

    return fields
}
