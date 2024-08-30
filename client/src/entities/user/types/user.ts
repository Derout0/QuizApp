export interface UserEntity {
    id: string
    email: string
    username: string
}

export interface UserSchema {
    data: UserEntity | undefined
}
