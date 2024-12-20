import type { PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from '@/app/providers/store-provider'
import type { ModuleEntity } from '@/entities/module'
import { ModuleDisplay } from '@/entities/module'
import LocalStorage from '@/shared/lib/utils/localstorage'
import { MODULES_DISPLAY_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage'
import type { ModulesSchema } from '../../model/types/module'
import { fetchModulesByUser } from '../services/fetchModulesByUser/fetchModulesByUser'

const initialState: ModulesSchema = {
    ids: [],
    entities: {},
    display: ModuleDisplay.SINGLE,
    page: 0,
    hasMore: true,
    error: undefined,
    isLoading: false,
}

const modulesAdapter = createEntityAdapter({
    selectId: (module: ModuleEntity) => module.moduleId,
})

export const getModulesSelector = modulesAdapter.getSelectors<StateSchema>(
    state => state.modules || modulesAdapter.getInitialState(),
)

const modulesSlice = createSlice({
    name: 'pages/modulesSlice',
    initialState: modulesAdapter.getInitialState<ModulesSchema>(initialState),
    reducers: {
        init: (state) => {
            const display = LocalStorage.get(MODULES_DISPLAY_LOCALSTORAGE_KEY)
            let limit

            switch (display) {
                case ModuleDisplay.SINGLE:
                    limit = 5
                    break
                case ModuleDisplay.COMPACT:
                    limit = 10
                    break
                default:
                    limit = 5
            }

            state.display = display
            state.limit = limit
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setDisplay: (state, action: PayloadAction<ModuleDisplay>) => {
            state.display = action.payload
            LocalStorage.set(MODULES_DISPLAY_LOCALSTORAGE_KEY, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchModulesByUser.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchModulesByUser.fulfilled, (state, action) => {
            modulesAdapter.addMany(state, action.payload.data)
            state.hasMore = action.payload.hasMore
            state.isLoading = false
            state.error = undefined
        })
        builder.addCase(fetchModulesByUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const {
    actions: modulesActions,
    reducer: modulesReducer,
} = modulesSlice
