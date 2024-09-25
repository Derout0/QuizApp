import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'
import type { ProfileEntity } from '@/entities/profile'
import type { UpdateProfileSchema } from '../../types/updateSettingsSchema'

export const updateProfileService = createAsyncThunk<ProfileEntity, UpdateProfileSchema, ThunkConfig<string>>(
    'update-profile/updateProfileService',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI
        try {
            const response = await extra.api.post<ProfileEntity>('/profile', data)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
