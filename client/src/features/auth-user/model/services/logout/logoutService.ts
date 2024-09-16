import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'

export const logoutService = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/registrationService',
    async (_, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            await extra.api.post<AuthResponse>('/logout')

            authResponseHandler({ purpose: 'forbid', thunkAPI })
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
