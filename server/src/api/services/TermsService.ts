import { TermsRepository } from '@/api/repositories/TermsRepository.ts'
import { RequestTermModel, TermModel } from '@/api/models/TermModel.ts'

export class TermsService {
    private termsRepository: TermsRepository

    constructor() {
        this.termsRepository = new TermsRepository()
    }

    async createTerms(terms: RequestTermModel[], moduleId: number): Promise<TermModel[]> {
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

    async deleteTermsByModuleId(moduleId: number) {
        return await this.termsRepository.delete({ moduleId })
    }
}