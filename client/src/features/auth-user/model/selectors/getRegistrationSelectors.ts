import type { StateSchema } from '@/app/providers/store-provider'

export const getRegistrationUsername = (state: StateSchema) => state?.registrationForm?.username || ''
export const getRegistrationEmail = (state: StateSchema) => state?.registrationForm?.email || ''
export const getRegistrationPassword = (state: StateSchema) => state?.registrationForm?.password || ''
export const getRegistrationIsLoading = (state: StateSchema) => state?.registrationForm?.isLoading || false
export const getRegistrationError = (state: StateSchema) => state?.registrationForm?.error || undefined
