import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { profileActions } from '@/entities/profile'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'

export const uploadAvatar = createAsyncThunk<string | void, File, ThunkConfig<string>>(
    'update-avatar/uploadAvatar',
    async (data, thunkAPI) => {
        const { extra, dispatch } = thunkAPI

        try {
            const formData = new FormData()
            formData.append('avatar', data)

            const result = await extra.api.post<string>('/avatar/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            dispatch(profileActions.setAvatarURL(result.data))

            return result.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
