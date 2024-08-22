import { UserRepository } from '@/api/repositories/user/UserRepository.js'

export class UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public static async getAllUsers() {
        const users = await UserRepository.getAllUsers()
        return users
    }
}
