import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { UserEntity, UserSchema } from '@/entities/user/model/types/user'
import { checkAuthorization } from '@/entities/user'

const initialState: UserSchema = {
    data: undefined,
    authorized: false,
    inited: false,
    isLoading: false,
    error: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<UserEntity>) => {
            state.data = action.payload
        },
        removeData: (state) => {
            state.data = undefined
        },
        authorize: (state) => {
            state.authorized = true
        },
        forbid: (state) => {
            state.authorized = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuthorization.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(checkAuthorization.fulfilled, (state) => {
            state.isLoading = false
            state.inited = true
            // ... обработка data в сервисе checkAuthorization
        })
        builder.addCase(checkAuthorization.rejected, (state, action) => {
            state.isLoading = false
            state.inited = true
            state.error = action.payload
        })
    },
})

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice
