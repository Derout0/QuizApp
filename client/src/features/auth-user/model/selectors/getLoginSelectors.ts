import type { StateSchema } from '@/app/providers/store-provider'

export const getLoginEmail = (state: StateSchema) => state?.loginForm.email
export const getLoginPassword = (state: StateSchema) => state?.loginForm.password
