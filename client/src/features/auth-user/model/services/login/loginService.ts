import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { UserEntity, AuthResponse } from '@/entities/user'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'
import { authResponseHandler } from '@/shared/lib/service/authResponseHandler'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'

interface LoginRequest {
    email: string
    password: string
}

export const loginService = createAsyncThunk<UserEntity, LoginRequest>(
    'service-user/loginService',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post<AuthResponse>('http://localhost:4000/api/login', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN)}`,
                },
                withCredentials: true,
            })

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
