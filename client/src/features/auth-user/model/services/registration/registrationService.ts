import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { type UserEntity } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'

interface RegistrationRequest {
    email: string
    password: string
    username: string
}

export const registrationService = createAsyncThunk<UserEntity, RegistrationRequest>(
    'service-user/registrationService',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post<AuthResponse>('http://localhost:4000/api/registration', data)

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
