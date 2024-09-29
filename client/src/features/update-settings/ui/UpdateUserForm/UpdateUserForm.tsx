import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { checkPasswordActions, CheckPasswordModal } from '@/features/check-password'

import { getUserData } from '@/entities/user'

import { useAppDispatch, useModal } from '@/shared/lib/hooks'

import type { InitialField } from '../../lib/hooks/useFieldManager/useFieldManager'
import { useFieldManager } from '../../lib/hooks/useFieldManager/useFieldManager'
import { getUpdateUserData } from '../../model/selectors/getUpdateSettingsSelectors'
import { updateUserService } from '../../model/service/updateUser/updateUserService'
import { updateSettingsActions } from '../../model/slice/updateSettingsSlice'
import { UpdateFields } from '../UpdateFields/UpdateFields'

export const UpdateUserForm = memo(() => {
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
        if (updated) {
            dispatch(updateUserService(updated))
        }
    }, [dispatch, updated])

    const onCancelEdit = useCallback(() => {
        dispatch(updateSettingsActions.resetData())
        dispatch(updateSettingsActions.clearEditableField())
    }, [dispatch])

    const onCheckPasswordClose = useCallback(() => {
        dispatch(checkPasswordActions.setPassword(''))
    }, [dispatch])

    const { visible, close, open } = useModal({ onClose: onCheckPasswordClose })

    const userFields: InitialField[] = [
        {
            id: 'username',
            onCheck: open,
            label: 'Имя пользователя',
            inputPlaceholder: 'Введите новое имя пользователя',
            newData: updated?.username || '',
            data: user?.username || '',
            onChange: onChangeUsername,
        },
        {
            id: 'email',
            onCheck: open,
            label: 'Email',
            inputPlaceholder: 'Введите новый email',
            newData: updated?.email || '',
            data: user?.email || '',
            onChange: onChangeEmail,
        },
        {
            id: 'password',
            onCheck: open,
            label: 'Пароль',
            inputPlaceholder: 'Введите новый пароль',
            inputType: 'password',
            newData: updated?.password || '',
            data: '**********',
            onChange: onChangePassword,
        },
    ]

    const { fields, setField } = useFieldManager({
        initialFields: userFields,
        onSaveEdit,
        onCancelEdit,
    })

    return (
        <>
            <UpdateFields fields={fields} />
            <CheckPasswordModal isOpen={visible} onClose={close} onSuccess={setField} />
        </>
    )
})
