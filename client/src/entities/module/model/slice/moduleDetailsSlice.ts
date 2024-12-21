import { createSlice } from '@reduxjs/toolkit'
import type { ModuleDetailsSchema } from '../../model/types/module'
import { fetchModuleById } from '../../model/service/fetchModuleById/fetchModuleById'

const initialState: ModuleDetailsSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
}

const moduleDetailsSlice = createSlice({
    name: 'module/moduleDetailsSlice',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchModuleById.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchModuleById.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.error = undefined
        })
        builder.addCase(fetchModuleById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: moduleDetailsActions,
    reducer: moduleDetailsReducer,
} = moduleDetailsSlice
