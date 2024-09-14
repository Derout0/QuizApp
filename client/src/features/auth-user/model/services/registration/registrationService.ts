import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { type UserEntity } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'

interface RegistrationRequest {
    email: string
    password: string
    username: string
}

export const registrationService = createAsyncThunk<UserEntity, RegistrationRequest, ThunkConfig>(
    'service-user/registrationService',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI
        try {
            const response = await extra.api.post<AuthResponse>('/registration', data)

            if (!response.data) {
                throw new Error()
            }

            const { user, tokens } = response.data

            authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
            return user
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
