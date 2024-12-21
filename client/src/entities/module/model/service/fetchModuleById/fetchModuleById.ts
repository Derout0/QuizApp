import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import type { ModuleEntity } from '@/entities/module'

export const fetchModuleById = createAsyncThunk<ModuleEntity, string, ThunkConfig<string>>(
    'module/fetchModuleById',
    async (moduleID, thunkAPI) => {
        const { extra } = thunkAPI

        try {
            const response = await extra.api.get<ModuleEntity>(`/modules/${moduleID}`)

            return response.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
