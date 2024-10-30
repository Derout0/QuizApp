import * as cls from './FileUploaderBody.module.scss'
import type { ChangeEvent } from 'react'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { FileItem, FileUploaderStatus } from '@/shared/lib/hooks/useFileUploader/useFileUploader'
import { VStack } from '@/shared/ui/Stack'
import { Dropzone } from '@/shared/ui/Dropzone/Dropzone'
import { FileRow } from '@/entities/file-uploader/ui/FileRow/FileRow'
import { LinearProgress } from '@/shared/ui/Progressbar'
import { Text } from '@/shared/ui/Text/Text'

interface FileUploaderBodyProps {
    className?: string
    files?: FileItem[]
    status: FileUploaderStatus | null
    uploaded: Record<string, string>
    uploading: boolean
    next?: FileItem | null
    error?: string
    isEditable: boolean
    allowedFileTypes: string[]
    onChange: (arg: ChangeEvent<HTMLInputElement> | File[]) => void
    onRemoveFile: (fileId: string | number) => void
}

export const FileUploaderBody = (props: FileUploaderBodyProps) => {
    const {
        className,
        files,
        uploaded,
        uploading,
        next,
        error,
        isEditable,
        allowedFileTypes,
        onChange,
        onRemoveFile,
    } = props

    const onDrop = (files: File[] | null) => {
        files && onChange(files)
    }

    const hasFiles = !!files?.length

    const mods: Mods = {
        [cls.uploading]: uploading,
    }

    return (
        <VStack className={classNames(cls.FileUploaderBody, mods, [className])}>
            <Dropzone
                className={cls.dropzone}
                hasFiles={hasFiles}
                onDrop={onDrop}
                allowedFileTypes={allowedFileTypes}
            >
                <VStack gap="8" maxWidth>
                    {files?.map(({ id, ...other }) => (
                        <FileRow
                            key={`file-row-${id}`}
                            id={id}
                            isEditable={isEditable}
                            uploaded={!!uploaded[id]}
                            uploading={!!(next && next.id === id)}
                            onRemoveFile={onRemoveFile}
                            {...other}
                        />
                    ))}
                </VStack>
                {error && (<Text className={cls.error} sx={{ color: 'on-error', fontSize: 'body-m' }} align="center">{error}</Text>)}
            </Dropzone>
            <LinearProgress className={cls.progressbar} />
        </VStack>
    )
}
