import { TermsService } from '@/api/services/TermsService.ts'
import { GameProgressRepository } from '@/api/repositories/GameProgressRepository.ts'
import { GameTypes } from '@/api/constants/GameTypes.ts'
import { ID } from '@/api/constants/base.ts'
import { UpdateGameProgressModel } from '@/api/models/GameProgressModel.ts'
import { TermsRepository } from '@/api/repositories/TermsRepository.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

export class GameProgressService {
    private gameProgressRepository: GameProgressRepository
    private termsService: TermsService
    private termsRepository: TermsRepository

    constructor() {
        this.gameProgressRepository = new GameProgressRepository()
        this.termsService = new TermsService()
        this.termsRepository = new TermsRepository()
    }

    async getGameProgress(userId: ID, moduleId: ID, game: GameTypes) {
        const terms = await this.termsService.getTermsByModuleId(moduleId)

        const progress = await this.gameProgressRepository.findAll({
            where: {
                userId,
                moduleId,
                gameType: game,
            },
        })

        const progressMap = Object.fromEntries(
            progress.map(progress => [progress.termId, progress]),
        )

        const result = terms.map((term) => {
            return {
                termId: term.termId,
                term: term.term,
                definition: term.definition,
                isLearned: progressMap[term.termId].isLearned || false,
                attempts: progressMap[term.termId].attempts || 0,
            }
        })

        return result
    }

    async updateGameProgress(userId: ID, moduleId: ID, data: UpdateGameProgressModel) {
        const { termId, isLearned, gameType } = data

        if (!Object.values(GameTypes).includes(gameType)) {
            throw ApiError.BadRequest('The game type doesn\'t exist')
        }

        const existingTerm = await this.termsRepository.findBy({ termId })

        if (!existingTerm) {
            throw ApiError.BadRequest('The term used for progress update was not found')
        }

        const progress = await this.gameProgressRepository.findBy({ termId, gameType })

        const result = await this.gameProgressRepository.upsert(
            {
                userId,
                termId,
                moduleId,
                gameType,
                isLearned,
            },
            ['userId', 'termId', 'gameType'],
            {
                isLearned,
                attempts: (progress?.attempts || 0) + 1,
                updatedAt: new Date(),
            },
        )

        return result
    }

    async resetGameProgress(userId: ID, moduleId: ID, game: GameTypes) {
        return this.gameProgressRepository.delete({ userId, moduleId, gameType: game })
    }
}
