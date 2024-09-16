import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ProfileEntity } from '../../types/profile'

interface ProfileDataRequest {
    id: number
}

export const fetchProfileData = createAsyncThunk<ProfileEntity, ProfileDataRequest, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            const response = await extra.api.get<ProfileEntity>(`/profile/${data.id}`)

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
