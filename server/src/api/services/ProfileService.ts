import { ProfileRepository } from '@/api/repositories/ProfileRepository.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { ProfileModel, RequestProfileModel } from '@/api/models/ProfileModel.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { FileService } from '@/api/services/FileService.js'

interface CreateProfileData extends Partial<RequestProfileModel> {
    userId: number
}

export class ProfileService {
    private repository: ProfileRepository
    private fileService: FileService

    constructor() {
        this.repository = new ProfileRepository()
        this.fileService = new FileService()
    }

    async createProfile(data: CreateProfileData) {
        const { userId, firstName, lastName, age, country } = data

        if (!userId) {
            throw ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG)
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

    async updateProfile(data: Partial<ProfileModel>, id: number): Promise<ProfileModel> {
        return await this.repository.update(data, { userId: id })
    }

    async getProfileByUserId(id: number) {
        if (!id) {
            throw ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG)
        }

        return await this.repository.findBy({ userId: id })
    }
}
