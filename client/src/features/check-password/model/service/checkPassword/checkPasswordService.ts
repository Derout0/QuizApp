import { createAsyncThunk } from '@reduxjs/toolkit'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ThunkConfig } from '@/app/providers/store-provider'

export interface CheckPasswordRequest {
    password: string
}

export const checkPasswordService = createAsyncThunk<boolean, CheckPasswordRequest, ThunkConfig<string>>(
    'check-password/checkPasswordService',
    async (data, thunkAPI) => {
        const { extra } = thunkAPI
        try {
            const response = await extra.api.post<boolean>('/check-password', data)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
