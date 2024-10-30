import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/store-provider'
import { thunkErrorHandler } from '@/shared/lib/service/thunkErrorHandler'
import { profileActions } from '@/entities/profile'

export const selectAvatar = createAsyncThunk<string | void, string, ThunkConfig<string>>(
    'update-avatar/selectAvatar',
    async (data, thunkAPI) => {
        const { extra, dispatch, getState } = thunkAPI

        const currentURL = getState().profile.data?.avatarUrl

        if (currentURL === data) {
            return
        }

        try {
            const result = await extra.api.post<string>('/avatar/select', { avatarUrl: data })

            dispatch(profileActions.setAvatarURL(result.data))

            return result.data
        }
        catch (error) {
            return thunkErrorHandler(error, thunkAPI)
        }
    },
)
