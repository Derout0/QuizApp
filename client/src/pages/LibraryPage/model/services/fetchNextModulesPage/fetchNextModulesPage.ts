import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import {
    getModulesPageIsLoading,
    getModulesPagePaginationHasMore,
    getModulesPagePaginationPage,
} from '../../selectors/modulesPageSelectors'
import { modulesActions } from '@/pages/LibraryPage'
import { fetchModulesByUser } from '@/pages/LibraryPage/model/services/fetchModulesByUser/fetchModulesByUser'

export const fetchNextModulesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'module/fetchNextModulesPage',
    async (data, thunkAPI) => {
        const { getState, dispatch } = thunkAPI

        const hasMore = getModulesPagePaginationHasMore(getState())
        const page = getModulesPagePaginationPage(getState())
        const isLoading = getModulesPageIsLoading(getState())

        if (hasMore && !isLoading) {
            const newPage = page + 1
            dispatch(modulesActions.setPage(newPage))
            dispatch(fetchModulesByUser({ page: newPage }))
        }
    },
)
