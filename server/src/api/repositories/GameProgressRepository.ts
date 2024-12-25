import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'
import { GameProgressModel } from '@/api/models/GameProgressModel.ts'

export const userGameProgressFieldMapping: FieldMapping<GameProgressModel> = {
    id: 'id',
    moduleId: 'module_id',
    userId: 'user_id',
    termId: 'term_id',
    gameType: 'game_type',
    attempts: 'attempts',
    isLearned: 'is_learned',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

export const userGameProgressFieldClientKeys = Object.keys(userGameProgressFieldMapping)

export class GameProgressRepository extends BaseRepository<GameProgressModel> {
    constructor() {
        super('user_game_progress', userGameProgressFieldMapping)
    }
}
