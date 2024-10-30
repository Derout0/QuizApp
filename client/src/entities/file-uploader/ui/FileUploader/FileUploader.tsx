import * as cls from './FileUploader.module.scss'
import { useRef } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useFileUploader } from '@/shared/lib/hooks'
import { MimeTypes } from '@/shared/consts/common'

import { FileUploaderHeader } from '../FileUploaderHeader/FileUploaderHeader'
import { FileUploaderBody } from '../FileUploaderBody/FileUploaderBody'
import { FileUploaderFooter } from '../FileUploaderFooter/FileUploaderFooter'

interface FileUploaderProps {
    className?: string
    multiple?: boolean
    accept?: MimeTypes[]
    progressbar?: boolean
    maxFiles?: number
    minFiles?: number
    maxFileSize?: number
    maxTotalSize?: number
    api: (arg: any) => Promise<any>
}

// TODO: dot-notation?
export const FileUploader = (props: FileUploaderProps) => {
    const {
        className,
        multiple = false,
        accept = [MimeTypes.JPEG, MimeTypes.PNG],
        progressbar = true,
        maxFiles: maxFilesProp,
        minFiles: minFilesProp,
        maxFileSize: maxFilesSizeProp,
        maxTotalSize: maxTotalSizeProp,
        api,
    } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const {
        files,
        pending,
        status,
        next,
        isEditable,
        uploading,
        uploaded,
        uploadedSize,
        maxFiles,
        maxFileSize,
        maxTotalSize,
        allowedFileTypes,
        error,
        onChange,
        onSubmit,
        onRemoveFile,
        onRemoveFiles,
    } = useFileUploader({
        api, inputRef,
        options: {
            allowedFileTypes: accept,
            maxFiles: maxFilesProp,
            minFiles: minFilesProp,
            maxFileSize: maxFilesSizeProp,
            maxTotalSize: maxTotalSizeProp,
        },
    })

    return (
        <form onSubmit={onSubmit} className={classNames(cls.FileUploader, {}, [className])}>
            <FileUploaderHeader
                accept={accept}
                multiple={multiple}
                inputRef={inputRef}
                uploadedSize={uploadedSize}
                maxFiles={maxFiles}
                maxFileSize={maxFileSize}
                maxTotalSize={maxTotalSize}
                files={files}
                pending={pending}
                status={status}
                progressbar={progressbar}
                onChange={onChange}
                onRemoveFiles={onRemoveFiles}
            />
            <FileUploaderBody
                files={files}
                status={status}
                uploaded={uploaded}
                uploading={uploading}
                next={next}
                error={error}
                isEditable={isEditable}
                allowedFileTypes={allowedFileTypes}
                onChange={onChange}
                onRemoveFile={onRemoveFile}
            />
            <FileUploaderFooter />
        </form>
    )
}
