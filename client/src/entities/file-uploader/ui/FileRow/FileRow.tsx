import * as cls from './FileRow.module.scss'
import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { memo } from 'react'

import TrashIcon from '@/shared/assets/icons/Trash.svg'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { Text } from '@/shared/ui/Text/Text'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { LinearProgress } from '@/shared/ui/Progressbar'
import { convertBytes } from '@/shared/lib/utils/fileUtils'

interface FileRowProps {
    className?: string
    id: string | number
    src: string
    file: File
    uploaded: boolean
    uploading: boolean
    isEditable: boolean
    onRemoveFile: (fileId: string | number) => void
}

const Caption = ({ children, label }: { children: ReactNode, label: string }) => (
    <VStack gap="4">
        <Text.SPAN sx={{ fontSize: 'body-s' }}>{label}</Text.SPAN>
        <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500', color: 'on-surface' }}>{children}</Text.SPAN>
    </VStack>
)

const UploadedInfo = ({ uploaded }: { uploaded: boolean }) => (
    <Text.SPAN
        className={cls.uploadedInfo}
        sx={{ fontWeight: '500', fontSize: 'body-s', color: 'on-tertiary' }}
    >
        {uploaded ? 'Заверешено' : 'В ожидании'}
    </Text.SPAN>
)

export const FileRow = memo((props: FileRowProps) => {
    const {
        className,
        id,
        src,
        file,
        uploaded,
        uploading,
        isEditable,
        onRemoveFile,
    } = props

    const onRemove = useCallback(() => {
        onRemoveFile(id)
    }, [id, onRemoveFile])

    const mods: Mods = {
        [cls.uploading]: uploading,
        [cls.uploaded]: uploaded,
    }

    return (
        <VStack className={classNames(cls.FileRow, mods, [className])}>
            <HStack gap="20" align="center">
                <HStack gap="20" align="center" flexGrow={1}>
                    <AppImage className={cls.image} src={src} alt={file.name} />
                    <HStack gap="20" align="center">
                        <Caption label="File name">{file.name}</Caption>
                        <Caption label="File size">{convertBytes(file.size, { unit: 'MB' })}</Caption>
                        <UploadedInfo uploaded={uploaded} />
                    </HStack>
                </HStack>
                <HStack>
                    {isEditable && (
                        <IconButton theme="outlined" onClick={onRemove}>
                            <Icon SVG={TrashIcon} />
                        </IconButton>
                    )}
                </HStack>
            </HStack>
            <LinearProgress className={cls.progressbar} />
        </VStack>
    )
})
