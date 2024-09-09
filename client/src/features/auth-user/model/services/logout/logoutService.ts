import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthResponse } from '@/entities/user'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'

export const logoutService = createAsyncThunk(
    'service-user/registrationService',
    async (_, thunkAPI) => {
        try {
            await axios.post<AuthResponse>('http://localhost:4000/api/logout')

            authResponseHandler({ purpose: 'forbid', thunkAPI })
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
