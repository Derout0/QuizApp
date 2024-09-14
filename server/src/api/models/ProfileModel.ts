// Используется для запроса при первом создании аккаунта, так как других полей еще не существует.
export interface RequestProfileModel {
    firstName: string
    lastName: string
    age: number
    country: string
}

// Полная модель Профиля в базе данных
export interface ProfileModel extends RequestProfileModel {
    profileId: number
    userId: number
    about: string
    avatarUrl: string
    createdAt: Date
    updatedAt: Date
}
