import { UserModel } from '@/api/models/UserModel.js'

export class UserDTO {
    userId: number
    email: string
    username: string

    constructor(model: UserModel) {
        this.userId = model.userId
        this.email = model.email
        this.username = model.username
    }
}
