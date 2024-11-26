import { ModuleRepository } from '@/api/repositories/ModuleRepository.ts'
import { ModuleModel, RequestModuleModel } from '@/api/models/ModuleModel.ts'
import { TermsService } from '@/api/services/TermsService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

export class ModuleService {
    private moduleRepository: ModuleRepository
    private termsService: TermsService

    constructor() {
        this.moduleRepository = new ModuleRepository()
        this.termsService = new TermsService()
    }

    async createModule(data: RequestModuleModel): Promise<ModuleModel> {
        const {
            name,
            description,
            userId,
            folderId,
            isPublic,
            terms,
        } = data

        const result = await this.moduleRepository.create({
            name,
            description,
            userId,
            folderId,
            isPublic,
        })

        await this.termsService.createTerms(terms, result.moduleId)

        return result
    }

    async getUserModules(userId: number) {
        if (!userId) {
            throw ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG)
        }

        return await this.moduleRepository.findAll({ userId: userId })
    }

    async updateModule(userId: number, moduleId: number, updateData: RequestModuleModel) {
        const existingModule = await this.moduleRepository.findBy({ userId, moduleId })
        const { terms, ...updateModuleData } = updateData

        if (!existingModule) {
            throw ApiError.NotFound('Module not found or not available for deletion')
        }

        const updatedModule = await this.moduleRepository.update(updateModuleData, { userId, moduleId })

        if (terms && terms.length > 0) {
            await this.termsService.deleteTermsByModuleId(moduleId)
            await this.termsService.createTerms(terms, moduleId)
        }

        return updatedModule
    }

    async deleteModule(userId: number, moduleId: number) {
        const existingModule = await this.moduleRepository.findBy({ userId: userId, moduleId: moduleId })

        if (!existingModule) {
            throw ApiError.BadRequest('Module not found or not available for deletion')
        }

        return await this.moduleRepository.delete({ moduleId: moduleId })
    }
}
