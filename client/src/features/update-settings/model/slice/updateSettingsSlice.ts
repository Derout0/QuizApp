import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { UpdateProfileSchema, UpdateSettingsSchema, UpdateUserSchema } from '../types/updateSettingsSchema'
import { updateProfileService } from '../service/updateProfile/updateProfileService'
import { updateUserService } from '../service/updateUser/updateUserService'

const initialState: UpdateSettingsSchema = {
    user: undefined,
    profile: undefined,
    editableField: null,
    isLoading: false,
    error: undefined,
}

export const updateSettingsSlice = createSlice({
    name: 'update-settings/updateSettings',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UpdateUserSchema>) => {
            state.user = { ...action.payload }
        },
        updateProfile: (state, action: PayloadAction<UpdateProfileSchema>) => {
            state.profile = { ...action.payload }
        },
        resetData: (state) => {
            state.user = undefined
            state.profile = undefined
        },
        setEditableField(state, action: PayloadAction<string | null>) {
            state.editableField = action.payload
        },
        clearEditableField(state) {
            state.editableField = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserService.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateUserService.fulfilled, (state) => {
            state.isLoading = false
            state.error = undefined
            state.user = undefined
            state.profile = undefined
        })
        builder.addCase(updateUserService.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.user = undefined
            state.profile = undefined
        })

        builder.addCase(updateProfileService.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateProfileService.fulfilled, (state) => {
            state.isLoading = false
            state.error = undefined
            state.user = undefined
            state.profile = undefined
        })
        builder.addCase(updateProfileService.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.user = undefined
            state.profile = undefined
        })
    },
})

export const {
    actions: updateSettingsActions,
    reducer: updateSettingsReducer,
} = updateSettingsSlice
