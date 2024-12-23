import type { PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from '@/app/providers/store-provider'
import type { ModuleEntity } from '@/entities/module'
import { ModuleDisplay } from '@/entities/module'
import LocalStorage from '@/shared/lib/utils/localstorage'
import { MODULES_DISPLAY_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage'
import type { ModulesPageSchema } from '../types/modulesPageSchema'
import { fetchModulesByUser } from '../services/fetchModulesByUser/fetchModulesByUser'

const initialState: ModulesPageSchema = {
    ids: [],
    entities: {},
    display: ModuleDisplay.SINGLE,
    page: 0,
    hasMore: true,
    search: '',
    error: undefined,
    isLoading: false,
}

const modulesPageAdapter = createEntityAdapter({
    selectId: (module: ModuleEntity) => module.moduleId,
})

export const getModulesPageSelector = modulesPageAdapter.getSelectors<StateSchema>(
    state => state.modulesPage || modulesPageAdapter.getInitialState(),
)

const modulesPageSlice = createSlice({
    name: 'pages/modulesPageSlice',
    initialState: modulesPageAdapter.getInitialState<ModulesPageSchema>(initialState),
    reducers: {
        init: (state, action: PayloadAction<URLSearchParams>) => {
            const display = LocalStorage.get(MODULES_DISPLAY_LOCALSTORAGE_KEY)

            const searchQuery = action.payload.get('search')

            let limit
            switch (display) {
                case ModuleDisplay.SINGLE:
                    limit = 10
                    break
                case ModuleDisplay.COMPACT:
                    limit = 20
                    break
                default:
                    limit = 10
            }

            state.search = searchQuery || ''
            state.display = display
            state.limit = limit
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setDisplay: (state, action: PayloadAction<ModuleDisplay>) => {
            state.display = action.payload
            LocalStorage.set(MODULES_DISPLAY_LOCALSTORAGE_KEY, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchModulesByUser.pending, (state, action) => {
            state.isLoading = true
            state.error = undefined

            if (action.meta.arg?.replaceData) modulesPageAdapter.removeAll(state)
        })
        builder.addCase(fetchModulesByUser.fulfilled, (state, action) => {
            if (action.meta.arg?.replaceData) {
                modulesPageAdapter.setAll(state, action.payload.data)
            } else {
                modulesPageAdapter.addMany(state, action.payload.data)
            }

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
    actions: modulesPageActions,
    reducer: modulesPageReducer,
} = modulesPageSlice
