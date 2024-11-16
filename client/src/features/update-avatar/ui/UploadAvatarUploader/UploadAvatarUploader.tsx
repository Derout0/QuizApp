import * as cls from './UploadAvatarUploader.module.scss'
import { FileUploader } from '@/entities/file-uploader'
import { useAppDispatch } from '@/shared/lib/hooks'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Button } from '@/shared/ui/Button/Button'
import { uploadAvatar } from '../../model/service/uploadAvatar/uploadAvatar'

export const UploadAvatarUploader = () => {
    const dispatch = useAppDispatch()

    const onUploadAvatar = async (file: File) => {
        dispatch(uploadAvatar(file))
    }

    return (
        <FileUploader api={onUploadAvatar} options={{ maxFiles: 1, maxFileSize: 5 }}>
            <VStack gap="20">
                <HStack gap="20" align="center" justify="space-between">
                    <FileUploader.UploadButton />
                    <FileUploader.Progressbar />
                </HStack>
                <VStack className={cls.body}>
                    <FileUploader.Dropzone>
                        <FileUploader.FileList />
                    </FileUploader.Dropzone>
                    <FileUploader.Error />
                </VStack>
                <FileUploader.SubmitButton>
                    <Button theme="filled" color="secondary">Отправить</Button>
                </FileUploader.SubmitButton>
            </VStack>
        </FileUploader>
    )
}
