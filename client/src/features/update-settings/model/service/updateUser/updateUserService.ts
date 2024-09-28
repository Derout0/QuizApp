import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'
import type { UserEntity } from '@/entities/user'
import { userActions } from '@/entities/user'
import type { UpdateUserSchema } from '../../types/updateSettingsSchema'

export const updateUserService = createAsyncThunk<UserEntity, UpdateUserSchema, ThunkConfig<string>>(
    'update-profile/updateUserService',
    async (data, thunkAPI) => {
        const { extra, dispatch } = thunkAPI
        try {
            const response = await extra.api.post<UserEntity>('/user', data)

            if (!response.data) {
                throw new Error()
            }

            dispatch(userActions.setData(response.data))

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
