import type { StateSchema } from '@/app/providers/store-provider'

export const getPassword = (state: StateSchema) => state.checkPasswordForm?.password || ''
export const getIsPasswordCorrect = (state: StateSchema) => state.checkPasswordForm?.isPasswordCorrect || false
export const getIsLoading = (state: StateSchema) => state.checkPasswordForm?.isLoading || false
export const getError = (state: StateSchema) => state.checkPasswordForm?.error || ''
