import type { StateSchema } from '@/app/providers/store-provider'

export const getUpdateUserData = (state: StateSchema) => state.updateSettings?.user || undefined
export const getUpdateProfileData = (state: StateSchema) => state.updateSettings?.profile || undefined
export const getUpdateEditableField = (state: StateSchema) => state.updateSettings?.editableFieldId || null
export const getUpdateIsLoading = (state: StateSchema) => state.updateSettings?.isLoading || false
export const getUpdateError = (state: StateSchema) => state.updateSettings?.error || undefined
