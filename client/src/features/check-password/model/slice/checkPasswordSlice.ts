import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { CheckPasswordSchema } from '../types/checkPasswordSchema'
import { checkPasswordService } from '../../model/service/checkPassword/checkPasswordService'

const initialState: CheckPasswordSchema = {
    password: '',
    isPasswordCorrect: false,
    isLoading: false,
    error: undefined,
}

export const checkPasswordSlice = createSlice({
    name: 'checkPassword',
    initialState,
    reducers: {
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkPasswordService.pending, (state) => {
            state.isPasswordCorrect = false
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(checkPasswordService.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.password = ''
            state.isPasswordCorrect = true
            state.isLoading = false
            state.error = undefined
        })
        builder.addCase(checkPasswordService.rejected, (state, action) => {
            state.password = ''
            state.isPasswordCorrect = false
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: checkPasswordActions,
    reducer: checkPasswordReducer,
} = checkPasswordSlice
