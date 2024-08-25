import { UserModel } from '@/api/models/UserModel.js'

export class UserDTO {
    id: number
    email: string
    username: string

    constructor(model: UserModel) {
        this.id = model.user_id
        this.email = model.email
        this.username = model.username
    }
}
