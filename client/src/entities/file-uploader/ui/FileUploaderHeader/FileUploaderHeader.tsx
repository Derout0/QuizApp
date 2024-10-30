import * as cls from './FileUploaderHeader.module.scss'
import type { ChangeEvent, RefObject } from 'react'

import UploadIcon from '@/shared/assets/icons/Upload.svg'
import TrashIcon from '@/shared/assets/icons/Trash.svg'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { UploadButton } from '@/shared/ui/UploadButton/UploadButton'
import type { MimeTypes } from '@/shared/consts/common'
import { LinearProgress } from '@/shared/ui/Progressbar'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Text } from '@/shared/ui/Text/Text'
import type { FileItem } from '@/shared/lib/hooks/useFileUploader/useFileUploader'
import { FileUploaderStatus } from '@/shared/lib/hooks/useFileUploader/useFileUploader'

interface FileUploaderHeaderProps {
    className?: string
    accept: MimeTypes[]
    multiple: boolean
    inputRef: RefObject<HTMLInputElement>
    uploadedSize: number
    maxFiles: number | false
    maxFileSize: number
    maxTotalSize: number
    files?: FileItem[]
    pending?: FileItem[]
    status: FileUploaderStatus | null
    progressbar: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onRemoveFiles: () => void
}

const StatusLabel = ({ files, pending, status }: { files: FileItem[], pending: FileItem[], status: FileUploaderStatus | null }) => {
    const total = files.length
    const remaining = Math.abs(pending.length - total)

    switch (status) {
        case FileUploaderStatus.PENDING:
            return (
                <Text sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                    Загружено
                    <Text.SPAN sx={{ fontWeight: '600' }}>{` ${remaining} `}</Text.SPAN>
                    /
                    <Text.SPAN sx={{ fontWeight: '600' }}>{` ${total}`}</Text.SPAN>
                </Text>
            )

        case FileUploaderStatus.UPLOADED:
            return (
                <Text sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                    Все файлы загружены
                </Text>
            )

        default: return null
    }
}

export const FileUploaderHeader = (props: FileUploaderHeaderProps) => {
    const {
        className,
        accept,
        multiple,
        inputRef,
        uploadedSize,
        maxFiles,
        maxFileSize,
        maxTotalSize,
        files = [],
        pending = [],
        status,
        progressbar,
        onChange,
        onRemoveFiles,
    } = props

    return (
        <HStack gap="20" align="center" className={classNames(cls.FileUploaderHeader, {}, [className])}>
            <HStack gap="20" align="center">
                <UploadButton accept={accept} inputRef={inputRef} multiple={multiple} onChange={onChange}>
                    <IconButton theme="tonal">
                        <Icon SVG={UploadIcon} />
                    </IconButton>
                </UploadButton>
                <IconButton onClick={onRemoveFiles} theme="tonal">
                    <Icon SVG={TrashIcon} />
                </IconButton>
                <StatusLabel files={files} pending={pending} status={status} />
            </HStack>
            <HStack gap="20" flexGrow={1} justify="end" align="center">
                <HStack gap="12">
                    <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                        Макс. кол-во файлов:
                        <Text.SPAN sx={{ fontWeight: '600' }}>{` ${maxFiles} шт`}</Text.SPAN>
                    </Text.SPAN>
                    <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                        Макс. размер файла:
                        <Text.SPAN sx={{ fontWeight: '600' }}>{` ${maxFileSize} MB`}</Text.SPAN>
                    </Text.SPAN>
                </HStack>
                {progressbar && (
                    <HStack flex="0 0 20rem">
                        <LinearProgress
                            size="large"
                            progress={{ value: uploadedSize, symbol: 'MB', label: true }}
                            total={{ value: maxTotalSize, symbol: 'MB', label: true }}
                        />
                    </HStack>
                )}
            </HStack>
        </HStack>
    )
}
