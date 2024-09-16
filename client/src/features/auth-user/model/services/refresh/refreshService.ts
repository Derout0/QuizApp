import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'

// TODO: DELETE?
export const refreshService = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/refreshService',
    async (_, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            const response = await extra.api.get<AuthResponse>('/refresh')
            const { tokens, user } = response.data

            authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
