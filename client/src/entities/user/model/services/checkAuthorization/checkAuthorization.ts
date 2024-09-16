import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import type { AuthResponse } from '@/entities/user'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'

export const checkAuthorization = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/checkAuthorization',
    async (_, thunkAPI) => {
        const { extra } = thunkAPI

        const token = localStorage.getItem(USER_ACCESS_TOKEN)

        try {
            if (token) {
                const response = await extra.api.get<AuthResponse>('/refresh', {
                    withCredentials: true,
                })

                const { user, tokens } = response.data

                authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
            }
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI, 'User is not authorized!')
        }
    },
)
