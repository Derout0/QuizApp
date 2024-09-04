import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'

export const refreshService = createAsyncThunk<void>(
    'service-user/refreshService',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponse>('http://localhost:4000/api/refresh', { withCredentials: true })
            const { tokens, user } = response.data

            authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
