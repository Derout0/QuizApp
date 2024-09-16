import { createAsyncThunk } from '@reduxjs/toolkit'
import type { UserEntity, AuthResponse } from '@/entities/user'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'

export interface LoginRequest {
    email: string
    password: string
}

export const loginService = createAsyncThunk<UserEntity, LoginRequest, ThunkConfig<string>>(
    'user/loginService',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            const response = await extra.api.post<AuthResponse>('/login', data)

            if (!response.data) {
                throw new Error()
            }

            const { tokens, user } = response.data

            authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
            return user
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
