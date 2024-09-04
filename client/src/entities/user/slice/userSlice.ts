import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { UserEntity, UserSchema } from '../types/user'

const initialState: UserSchema = {
    data: undefined,
    authorized: false,
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
})

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice
