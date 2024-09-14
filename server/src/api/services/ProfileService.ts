import { ProfileRepository } from '@/api/repositories/ProfileRepository.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { RequestProfileModel } from '@/api/models/ProfileModel.ts'

interface CreateProfileData extends Partial<RequestProfileModel> {
    userId: number
}

export class ProfileService {
    private repository: ProfileRepository

    constructor() {
        this.repository = new ProfileRepository()
    }

    async createProfile(data: CreateProfileData) {
        const { userId, firstName, lastName, age, country } = data

        if (!userId) {
            throw ApiError.BadRequest('User ID not found!')
        }

        if (age && (age < 0 || age > 100)) {
            throw ApiError.BadRequest('Age must be between 0 and 100!')
        }

        return await this.repository.create({
            userId,
            firstName,
            lastName,
            age,
            country,
        })
    }

    async getProfileByUserId(id: number) {
        if (!id) {
            throw ApiError.BadRequest('ID not found!')
        }

        return await this.repository.findBy({ userId: id })
    }
}
