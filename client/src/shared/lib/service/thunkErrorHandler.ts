import type { GetThunkAPI } from '@reduxjs/toolkit'
import type { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { isAxiosError } from 'axios'

/**
 * Функция принимает объект ошибки, thunkAPI и необязательное
 * сообщение. В зависимости от типа ошибки возвращает сообщение.
 *
 * @param error - Объект ошибки, который нужно обработать.
 * @param thunkAPI - Объект API для работы с thunk, предоставляющий доступ к dispatch и getState.
 * @param message - Необязательное сообщение об ошибке, которое будет возвращено, если ошибка не является Axios.
 */

export const thunkErrorHandler = (
    error: unknown,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>,
    message?: string,
) => {
    if (isAxiosError(error)) {
        if (error.response && error.response.data.message) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
        else {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
    else {
        return thunkAPI.rejectWithValue(message || '[Error]: An unexpected error occurred')
    }
}
