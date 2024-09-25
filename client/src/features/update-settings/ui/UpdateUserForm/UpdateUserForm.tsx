import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { getUserData } from '@/entities/user'

import { useAppDispatch } from '@/shared/lib/hooks'

import { useFieldManager } from '../../lib/hooks/useFieldManager/useFieldManager'
import { getUpdateUserData } from '../../model/selectors/getUpdateSettingsSelectors'
import { updateUserService } from '../../model/service/updateUser/updateUserService'
import { updateSettingsActions } from '../../model/slice/updateSettingsSlice'
import { UpdateFields } from '../UpdateFields/UpdateFields'

export const UpdateUserForm = () => {
    const dispatch = useAppDispatch()

    const user = useSelector(getUserData)
    const updated = useSelector(getUpdateUserData)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateUser({ username: value }))
    }, [dispatch])

    const onChangeEmail = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateUser({ email: value }))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(updateSettingsActions.updateUser({ password: value }))
    }, [dispatch])

    const onSaveEdit = useCallback(() => {
        dispatch(updateUserService(updated))
    }, [dispatch, updated])

    const onCancelEdit = useCallback(() => {
        dispatch(updateSettingsActions.resetData())
        dispatch(updateSettingsActions.clearEditableField())
    }, [dispatch])

    const userFields = [
        {
            id: 'username',
            label: 'Username',
            newData: updated?.username || '',
            data: user?.username || '',
            onChange: onChangeUsername,
        },
        {
            id: 'email',
            label: 'Email',
            newData: updated?.email || '',
            data: user?.email || '',
            onChange: onChangeEmail,
        },
        {
            id: 'password',
            label: 'Password',
            newData: updated?.password || '',
            data: '**********',
            onChange: onChangePassword,
        },
    ]

    const fields = useFieldManager({ initialFields: userFields, onSaveEdit, onCancelEdit })

    return (
        <UpdateFields fields={fields} />
    )
}
