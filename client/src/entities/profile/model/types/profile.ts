import type { CountryCodes } from '@/shared/consts/common'

export interface ProfileEntity {
    profileId: number
    userId: number
    avatarUrl: string
    firstName: string
    lastName: string
    about: string
    age: number
    country: CountryCodes
    createdAt: string
    updatedAt: string
}

export interface ProfileSchema {
    data?: ProfileEntity
    isLoading: boolean
    error?: string
}
