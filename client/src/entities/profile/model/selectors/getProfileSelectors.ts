import type { StateSchema } from '@/app/providers/store-provider'
import { createSelector } from '@reduxjs/toolkit'

export const getProfileData = (state: StateSchema) => state.profile?.data || undefined
export const getProfileAvatarURL = createSelector([getProfileData], data => data?.avatarUrl) || undefined
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading || false
export const getProfileError = (state: StateSchema) => state.profile?.error || undefined
