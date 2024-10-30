import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'

export const fetchAvatars = createAsyncThunk<string[], void, ThunkConfig<string>>(
    'update-avatar/fetchAvatars',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            const result = await extra.api.get<string[]>('/avatars')

            return result.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
