import { UpdateBlock } from '@/features/update-settings/ui/UpdateBlock/UpdateBlock'

import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { VStack } from '@/shared/ui/Stack'

import { updateSettingsReducer } from '../../model/slice/updateSettingsSlice'
import { UpdateProfileForm } from '../UpdateProfileForm/UpdateProfileForm'
import { UpdateUserForm } from '../UpdateUserForm/UpdateUserForm'
import { UpdateAvatarForm } from '@/features/update-avatar'

const reducers: ReducersList = {
    updateSettings: updateSettingsReducer,
}

export const UpdateForm = () => {
    return (
        <AsyncReducerLoader reducers={reducers}>
            <VStack gap="28">
                <UpdateBlock title="Изображение профиля">
                    <UpdateAvatarForm />
                </UpdateBlock>
                <UpdateBlock title="Персональная информация">
                    <UpdateUserForm />
                </UpdateBlock>
                <UpdateBlock title="Информация профиля">
                    <UpdateProfileForm />
                </UpdateBlock>
            </VStack>
        </AsyncReducerLoader>
    )
}
