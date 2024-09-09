import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RegistrationSchema } from '../types/registrationSchema'
import { registrationService } from '../services/registration/registrationService'

const initialState: RegistrationSchema = {
    username: '',
    email: '',
    password: '',
    isLoading: false,
    error: undefined,
}

export const registrationSlice = createSlice({
    name: 'service/registration',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registrationService.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(registrationService.fulfilled, (state) => {
            state.isLoading = false

            state.email = ''
            state.password = ''
            state.username = ''
        })
        builder.addCase(registrationService.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: registrationActions,
    reducer: registrationReducer,
} = registrationSlice
