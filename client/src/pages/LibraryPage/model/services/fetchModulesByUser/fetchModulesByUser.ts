import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { FetchModulesByUserParams, FetchModulesByUserResponse } from '../../types/fetchModulesByUser'
import { getModulesPagePaginationLimit } from '../../selectors/modulesPageSelectors'

export const fetchModulesByUser = createAsyncThunk<FetchModulesByUserResponse, FetchModulesByUserParams, ThunkConfig<string>>(
    'module/fetchModulesByUser',
    async (data, thunkAPI) => {
        const { extra, getState } = thunkAPI

        const { page = 0, search } = data
        const limit = getModulesPagePaginationLimit(getState())

        try {
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
