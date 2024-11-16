import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ProfileEntity, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '@/entities/profile'

const initialState: ProfileSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
}

const profileSlice = createSlice({
    name: 'profile/profileSlice',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ProfileEntity>) => {
            state.data = action.payload
        },
        setAvatarURL: (state, action: PayloadAction<string>) => {
            if (state.data) {
                console.log(action.payload)
                state.data.avatarUrl = action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = undefined
            state.data = action.payload
        })
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    reducer: profileReducer,
    actions: profileActions,
} = profileSlice
