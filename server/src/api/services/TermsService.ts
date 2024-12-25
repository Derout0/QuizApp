import { TermsRepository } from '@/api/repositories/TermsRepository.ts'
import { RequestTermModel, TermModel } from '@/api/models/TermModel.ts'
import { ID } from '@/api/constants/base.ts'

export class TermsService {
    private termsRepository: TermsRepository

    constructor() {
        this.termsRepository = new TermsRepository()
    }

    async getTermsByModuleId(moduleId: ID): Promise<TermModel[]> {
        return await this.termsRepository.findAll({ where: { moduleId } })
    }

    async createTerms(terms: RequestTermModel[], moduleId: ID): Promise<TermModel[]> {
        const result: TermModel[] = []

        for (const term of terms) {
            const createdTerm = await this.termsRepository.create({
                term: term.term,
                definition: term.definition,
                moduleId: moduleId,
            })
            result.push(createdTerm)
        }

        return result
    }

    async deleteTermsByModuleId(moduleId: ID) {
        return await this.termsRepository.delete({ moduleId })
    }
}
