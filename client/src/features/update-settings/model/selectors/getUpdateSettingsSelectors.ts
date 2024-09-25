import type { StateSchema } from '@/app/providers/store-provider'

export const getUpdateUserData = (state: StateSchema) => state.updateSettings?.user || { ...state.updateSettings?.user }
export const getUpdateProfileData = (state: StateSchema) => state.updateSettings?.profile || { ...state.updateSettings?.profile }
export const getUpdateEditableField = (state: StateSchema) => state.updateSettings?.editableField || null
export const getUpdateIsLoading = (state: StateSchema) => state.updateSettings?.isLoading || false
export const getUpdateError = (state: StateSchema) => state.updateSettings?.error || undefined
