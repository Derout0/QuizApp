export interface ProfileModel {
    profileId: number
    userId: number
    avatarUrl: string
    firstName: string
    lastName: string
    about: string
    age: number
    country: string
    createdAt: Date
    updatedAt: Date
}

export type RequestProfileModel = Omit<ProfileModel, 'profileId' | 'userId' | 'avatarUrl' | 'about' | 'createdAt' | 'updatedAt'>
