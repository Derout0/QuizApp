import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AuthResponse } from '@/entities/user'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'

export const checkAuthorization = createAsyncThunk(
    'user/checkAuthorization',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponse>('http://localhost:4000/api/refresh', {
                withCredentials: true,
            })

            const { user, tokens } = response.data

            authResponseHandler({ purpose: 'save', thunkAPI, user, tokens })
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI, 'User is not authorized!')
        }
    },
)
