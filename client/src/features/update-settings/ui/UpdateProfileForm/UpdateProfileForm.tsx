import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { updateProfileService } from '@/features/update-settings'

import { getProfileData } from '@/entities/profile'

import { useAppDispatch } from '@/shared/lib/hooks'

import type { InitialField } from '../../lib/hooks/useFieldManager/useFieldManager'
import { useFieldManager } from '../../lib/hooks/useFieldManager/useFieldManager'
import { getUpdateProfileData } from '../../model/selectors/getUpdateSettingsSelectors'
import { updateSettingsActions } from '../../model/slice/updateSettingsSlice'
import { UpdateFields } from '../UpdateFields/UpdateFields'

export const UpdateProfileForm = () => {
    const dispatch = useAppDispatch()

    const profile = useSelector(getProfileData)
    const updated = useSelector(getUpdateProfileData)

    const onChangeFirstName = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateProfile({ firstName: value }))
    }, [dispatch])

    const onChangeLastName = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateProfile({ lastName: value }))
    }, [dispatch])

    const onSaveEdit = useCallback(() => {
        if (updated) {
            dispatch(updateProfileService(updated))
        }
    }, [dispatch, updated])

    const onCancelEdit = useCallback(() => {
        dispatch(updateSettingsActions.resetData())
        dispatch(updateSettingsActions.clearEditableField())
    }, [dispatch])

    const userFields: InitialField[] = [
        {
            id: 'firstName',
            label: 'Имя',
            inputPlaceholder: 'Введите новое имя',
            newData: updated?.firstName || '',
            data: profile?.firstName || '',
            onChange: onChangeFirstName,
        },
        {
            id: 'lastName',
            label: 'Фамилия',
            inputPlaceholder: 'Введите новую фамилию',
            newData: updated?.lastName || '',
            data: profile?.lastName || '',
            onChange: onChangeLastName,
        },
    ]

    const { fields } = useFieldManager({ initialFields: userFields, onSaveEdit, onCancelEdit })

    return (
        <UpdateFields fields={fields} />
    )
}
