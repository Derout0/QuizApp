import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { ModuleEntity, ModuleSchema } from '../../model/types/module'
import type { StateSchema } from '@/app/providers/store-provider'

const initialState: ModuleSchema = {
    ids: [],
    entities: {},
    error: undefined,
    isLoading: false,
}

const moduleAdapter = createEntityAdapter({
    selectId: (module: ModuleEntity) => module.moduleId,
})

export const getModulesSelector = moduleAdapter.getSelectors<StateSchema>(
    state => state.modules || moduleAdapter.getInitialState(),
)

const moduleSlice = createSlice({
    name: 'module/moduleSlice',
    initialState: moduleAdapter.getInitialState<ModuleSchema>(initialState),
    reducers: {
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchModule.pending, (state) => {
        //     state.isLoading = true
        //     state.error = undefined
        // })
        // builder.addCase(fetchModule.fulfilled, (state, action) => {
        //     moduleAdapter.setAll(state, action.payload.data)
        //     state.count = action.payload.count
        //     state.limit = action.payload.limit
        //     state.currentPage = action.payload.currentPage
        //     state.totalPages = action.payload.totalPages
        //     state.hasMore = action.payload.hasMore
        //     state.isLoading = false
        //     state.error = undefined
        // })
        // builder.addCase(fetchModule.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.error = action.payload
        // })
    },
})

export const {
    actions: moduleActions,
    reducer: moduleReducer,
} = moduleSlice
