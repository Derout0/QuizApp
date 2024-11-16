import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { UploadAvatarUploader } from '../UploadAvatarUploader/UploadAvatarUploader'

export const UploadAvatarForm = () => {
    return (
        <VStack gap="20">
            <Text sx={{ fontSize: 'title-l', fontWeight: '600' }} align="center">Загрузите свою фотографию</Text>
            <UploadAvatarUploader />
        </VStack>
    )
}
