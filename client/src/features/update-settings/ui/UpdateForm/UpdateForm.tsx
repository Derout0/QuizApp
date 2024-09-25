import type { ReducersList } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { AsyncReducerLoader } from '@/shared/lib/components/AsyncReducerLoader/AsyncReducerLoader'
import { VStack } from '@/shared/ui/Stack'
import { updateSettingsReducer } from '../../model/slice/updateSettingsSlice'
import { UpdateProfileForm } from '../UpdateProfileForm/UpdateProfileForm'
import { UpdateUserForm } from '../UpdateUserForm/UpdateUserForm'
import { Text } from '@/shared/ui/Text/Text'

const reducers: ReducersList = {
    updateSettings: updateSettingsReducer,
}

export const UpdateForm = () => {
    return (
        <AsyncReducerLoader reducers={reducers}>
            <VStack gap="20">
                <VStack gap="20">
                    <Text.TitleH3 sx={{ fontSize: 'headline-s' }}>Персональная информация</Text.TitleH3>
                    <UpdateUserForm />
                </VStack>
                <UpdateProfileForm />
            </VStack>
        </AsyncReducerLoader>
    )
}
