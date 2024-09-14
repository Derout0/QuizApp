import { createSlice } from '@reduxjs/toolkit'
import type { ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
}

const profileSlice = createSlice({
    name: 'profile/profileSlice',
    initialState,
    reducers: {},
})

export const {
    reducer: profileReducer,
    actions: profileActions,
} = profileSlice
