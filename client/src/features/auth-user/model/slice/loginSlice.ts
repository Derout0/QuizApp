import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { LoginSchema } from '../types/loginSchema'
import { loginService } from '../services/login/loginService'

const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
    error: undefined,
}

export const loginSlice = createSlice({
    name: 'service/login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginService.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(loginService.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(loginService.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: loginActions,
    reducer: loginReducer,
} = loginSlice
