import { ProfileRepository } from '@/api/repositories/ProfileRepository.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

export class ProfileService {
    private profileRepository: ProfileRepository

    constructor() {
        this.profileRepository = new ProfileRepository()
    }

    async createProfile(data: {
        userId: number
        firstName?: string
        lastName?: string
        age?: number
        country?: string
    }) {
        if (!data.userId) {
            throw ApiError.BadRequest('User ID not found!')
        }

        if (data.age && (data.age < 0 || data.age > 100)) {
            throw ApiError.BadRequest('Age must be between 0 and 100!')
        }

        return await this.profileRepository.create({
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            country: data.country,
        })
    }
}
