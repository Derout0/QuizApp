import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'
import { ProfileModel } from '@/api/models/ProfileModel.ts'

const profileFieldMapping: FieldMapping<ProfileModel> = {
    profileId: 'token_id',
    userId: 'user_id',
    avatarUrl: 'avatar_url',
    firstName: 'first_name',
    lastName: 'last_name',
    about: 'about',
    age: 'age',
    country: 'country',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

export class ProfileRepository extends BaseRepository<ProfileModel> {
    constructor() {
        super('profiles', profileFieldMapping)
    }
}