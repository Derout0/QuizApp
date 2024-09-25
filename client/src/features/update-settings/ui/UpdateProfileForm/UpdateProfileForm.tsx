import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { getProfileData } from '@/entities/profile'

import { useAppDispatch } from '@/shared/lib/hooks'

import { useFieldManager } from '../../lib/hooks/useFieldManager/useFieldManager'
import { getUpdateProfileData } from '../../model/selectors/getUpdateSettingsSelectors'
import { updateSettingsActions } from '../../model/slice/updateSettingsSlice'
import { UpdateFields } from '../UpdateFields/UpdateFields'
import { updateProfileService } from '@/features/update-settings'

export const UpdateProfileForm = () => {
    const dispatch = useAppDispatch()

    const profile = useSelector(getProfileData)
    const updated = useSelector(getUpdateProfileData)

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateProfile({ firstName: value }))
    }, [dispatch])

    const onSaveEdit = useCallback(() => {
        dispatch(updateProfileService(updated))
    }, [dispatch, updated])

    const onCancelEdit = useCallback(() => {
        dispatch(updateSettingsActions.resetData())
        dispatch(updateSettingsActions.clearEditableField())
    }, [dispatch])

    const userFields = [
        {
            id: 'firstName',
            label: 'First name',
            newData: updated?.firstName || '',
            data: profile?.firstName || '',
            onChange: onChangeFirstname,
        },
    ]

    const fields = useFieldManager({ initialFields: userFields, onSaveEdit, onCancelEdit })

    return (
        <UpdateFields fields={fields} />
    )
}
