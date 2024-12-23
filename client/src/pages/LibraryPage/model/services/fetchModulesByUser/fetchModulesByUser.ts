import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { FetchModulesByUserResponse } from '../../types/fetchModulesByUser'
import {
    getModulesPagePaginationLimit,
    getModulesPagePaginationPage,
    getModulesPageSearch,
} from '../../selectors/modulesPageSelectors'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'

export const fetchModulesByUser = createAsyncThunk<
    FetchModulesByUserResponse,
    { replaceData?: boolean } | undefined,
    ThunkConfig<string>
>(
    'modulesPage/fetchModulesByUser',
    async (data, thunkAPI) => {
        const { extra, getState } = thunkAPI

        const page = getModulesPagePaginationPage(getState())
        const limit = getModulesPagePaginationLimit(getState())
        const search = getModulesPageSearch(getState())

        try {
            addQueryParams({ search })

            const response = await extra.api.get<FetchModulesByUserResponse>(`/modules`, {
                params: {
                    page,
                    limit,
                    search,
                },
            })

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
