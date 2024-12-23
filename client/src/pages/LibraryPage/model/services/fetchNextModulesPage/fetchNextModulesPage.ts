import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import {
    getModulesPageIsLoading,
    getModulesPagePaginationHasMore,
    getModulesPagePaginationPage,
} from '../../selectors/modulesPageSelectors'
import { modulesPageActions } from '../../slices/modulesPageSlice'
import { fetchModulesByUser } from '../../services/fetchModulesByUser/fetchModulesByUser'

export const fetchNextModulesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'modulesPage/fetchNextModulesPage',
    async (data, thunkAPI) => {
        const { getState, dispatch } = thunkAPI

        const hasMore = getModulesPagePaginationHasMore(getState())
        const page = getModulesPagePaginationPage(getState())
        const isLoading = getModulesPageIsLoading(getState())

        if (hasMore && !isLoading) {
            const newPage = page + 1
            dispatch(modulesPageActions.setPage(newPage))
            dispatch(fetchModulesByUser())
        }
    },
)
