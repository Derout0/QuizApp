import type { CountryCodes } from '@/shared/consts/common'

export interface ProfileEntity {
    firstName: string
    lastName: string
    avatarUrl: string
    about: string
    age: number
    country: CountryCodes
}

export interface ProfileSchema {
    data?: ProfileEntity
    isLoading: boolean
    error?: string
}
