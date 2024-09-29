import type { CountryCodes } from '@/shared/consts/common'

export interface UpdateUserSchema {
    email?: string
    username?: string
    password?: string
}

export interface UpdateProfileSchema {
    avatarUrl?: string
    firstName?: string
    lastName?: string
    about?: string
    age?: number
    country?: CountryCodes
    updatedAt?: string
}

export interface UpdateSettingsSchema {
    user?: UpdateUserSchema
    profile?: UpdateProfileSchema
    editableFieldId: string | null
    isLoading: boolean
    error?: string
}
