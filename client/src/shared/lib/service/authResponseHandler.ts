import type { GetThunkAPI } from '@reduxjs/toolkit'
import type { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import type { TokenEntity, UserEntity } from '@/entities/user'
import { userActions } from '@/entities/user'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'

type AuthResponseHandlerProps =
  | {
      purpose: 'forbid'
      thunkAPI: GetThunkAPI<AsyncThunkConfig>
      user?: never
      tokens?: never
  }
  | {
      purpose: 'save'
      thunkAPI: GetThunkAPI<AsyncThunkConfig>
      user: UserEntity
      tokens: TokenEntity
  }

/**
 * Обрабатывает ответ авторизации, сохраняя или удаляя данные пользователя и токены.
 *
 * @param props - Объект параметров, который содержит цель обработки и соответствующие данные.
 * - Если purpose: 'save', требуется передать thunkAPI, user, и tokens.
 * - Если purpose: 'forbid', требуется передать только thunkAPI.
 */
export const authResponseHandler = (props: AuthResponseHandlerProps): void => {
    const {
        purpose,
        thunkAPI,
        user,
        tokens,
    } = props

    switch (purpose) {
        case 'forbid':
            thunkAPI.dispatch(userActions.forbid())
            thunkAPI.dispatch(userActions.removeData())
            localStorage.removeItem(USER_ACCESS_TOKEN)
            break

        default:
            thunkAPI.dispatch(userActions.setData(user))
            thunkAPI.dispatch(userActions.authorize())
            localStorage.setItem(USER_ACCESS_TOKEN, tokens.accessToken)
            break
    }
}
