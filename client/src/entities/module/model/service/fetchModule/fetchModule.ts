import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'

// export const fetchModule = createAsyncThunk<FetchModulesByUserResponse, FetchModulesByUserParams, ThunkConfig<string>>(
//     'module/fetchModule',
//     async (data, thunkAPI) => {
//         const { extra } = thunkAPI
//
//         const { page, limit, search } = data
//
//         try {
//             const response = await extra.api.get<FetchModulesByUserResponse>(`/modules`, {
//                 params: {
//                     page,
//                     limit,
//                     search,
//                 },
//             })
//
//             return response.data
//         }
//         catch (error) {
//             return thunkErrorHandler(error, thunkAPI)
//         }
//     },
// )
