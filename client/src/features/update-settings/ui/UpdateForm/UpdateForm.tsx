import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { VStack } from '@/shared/ui/Stack'

import { UpdateAvatar } from '@/features/update-avatar'

import { updateSettingsReducer } from '../../model/slice/updateSettingsSlice'
import { UpdateBlock } from '../UpdateBlock/UpdateBlock'
import { UpdateProfileForm } from '../UpdateProfileForm/UpdateProfileForm'
import { UpdateUserForm } from '../UpdateUserForm/UpdateUserForm'

const reducers: ReducersList = {
    updateSettings: updateSettingsReducer,
}

export const UpdateForm = () => {
    return (
        <AsyncReducerLoader reducers={reducers}>
            <VStack gap="28">
                <UpdateBlock title="Изображение профиля">
                    <UpdateAvatar />
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
