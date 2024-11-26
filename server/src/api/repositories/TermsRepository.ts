import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'
import { TermModel } from '@/api/models/TermModel.ts'

export const termsFieldMapping: FieldMapping<TermModel> = {
    moduleId: 'module_id',
}

export const foldersFieldClientKeys = Object.keys(termsFieldMapping)

export class TermsRepository extends BaseRepository<TermModel> {
    constructor() {
        super('terms', termsFieldMapping)
    }
}
