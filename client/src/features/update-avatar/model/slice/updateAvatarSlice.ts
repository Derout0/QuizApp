import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { UpdateAvatarSchema } from '../types/updateAvatarSchema'
import { fetchAvatars } from '../service/fetchAvatars/fetchAvatars'
import { selectAvatar } from '../service/selectAvatar/selectAvatar'

const initialState: UpdateAvatarSchema = {
    URLs: [],
    isLoading: false,
    error: undefined,
}

export const updateAvatarSlice = createSlice({
    name: 'update-avatars/updateAvatar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAvatars.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
        builder.addCase(fetchAvatars.fulfilled, (state, action: PayloadAction<string[]>) => {
            state.isLoading = false
            state.URLs = action.payload
        })
        builder.addCase(fetchAvatars.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(selectAvatar.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
        builder.addCase(selectAvatar.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(selectAvatar.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: updateAvatarActions,
    reducer: updateAvatarReducer,
} = updateAvatarSlice
