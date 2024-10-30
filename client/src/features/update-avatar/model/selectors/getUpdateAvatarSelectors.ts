import type { StateSchema } from '@/app/providers/store-provider'

export const getUpdateAvatarURLs = (state: StateSchema) => state.updateAvatar?.URLs || []
