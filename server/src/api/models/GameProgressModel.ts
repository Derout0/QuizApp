import { ID } from '@/api/constants/base.ts'
import { GameTypes } from '@/api/constants/GameTypes.ts'

interface BaseGameProgressModel {
    termId: ID
    gameType: GameTypes
    isLearned: boolean
}

export interface GameProgressModel extends BaseGameProgressModel {
    id: ID
    userId: ID
    moduleId: ID
    attempts: number
    createdAt: Date
    updatedAt: Date
}

export type UpdateGameProgressModel = BaseGameProgressModel
export type RequestGameProgressModel = UpdateGameProgressModel
