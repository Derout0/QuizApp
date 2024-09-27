import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'
import type { ProfileEntity } from '@/entities/profile'
import { fetchProfileData } from '@/entities/profile'
import type { UpdateProfileSchema } from '../../types/updateSettingsSchema'

export const updateProfileService = createAsyncThunk<ProfileEntity, UpdateProfileSchema, ThunkConfig<string>>(
    'update-profile/updateProfileService',
    async (data, thunkAPI) => {
        const { extra, dispatch, getState } = thunkAPI
        try {
            const response = await extra.api.post<ProfileEntity>('/profile', data)
            const id = getState().user?.data?.userId

            if (!response.data || !id) {
                throw new Error()
            }

            dispatch(fetchProfileData({ id }))

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
