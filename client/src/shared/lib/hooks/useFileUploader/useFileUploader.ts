import type { ChangeEvent, FormEvent, RefObject } from 'react'
import { useEffect } from 'react'
import { useCallback, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { convertBytes, convertToBytes } from '@/shared/lib/utils/fileUtils'
import { MimeTypes } from '@/shared/consts/common'

const MAX_FILES: number = 10
const MIN_FILES: number = 1
const MAX_FILE_SIZE_MB: number = 5
const MAX_TOTAL_SIZE_MB: number = MAX_FILES * MAX_FILE_SIZE_MB

export enum FileUploaderStatus {
    LOADED = 'LOADED',
    INIT = 'INIT',
    PENDING = 'PENDING',
    UPLOADED = 'UPLOADED',
    ERROR = 'ERROR',
}

enum FileUploaderAction {
    LOAD = 'LOAD',
    SUBMIT = 'SUBMIT',
    NEXT = 'NEXT',
    REMOVE_FILE = 'REMOVE_FILE',
    REMOVE_FILES = 'REMOVE_FILES',
    FILE_UPLOADED = 'FILE_UPLOADED',
    FILES_UPLOADED = 'FILES_UPLOADED',
    UPDATE_UPLOADED_SIZE = 'UPDATE_UPLOADED_SIZE',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
}

export interface FileItem {
    id: string | number
    src: string
    file: File
}

interface FileAction {
    type: FileUploaderAction
    files?: FileItem[]
    pending?: FileItem[]
    next?: FileItem | null
    prev?: { id: string | number, file: File }
    uploadedSize?: number
    fileId?: string | number
    error?: string
}

interface FileUploaderState {
    files?: FileItem[]
    pending?: FileItem[]
    status: FileUploaderStatus | null
    next?: FileItem | null
    isEditable: boolean
    uploading: boolean
    uploaded: Record<string, any>
    uploadedSize: number
    error?: string
}

interface RequiredOptions {
    minFiles: number
    maxFiles: number
    maxFileSize: number
    maxTotalSize: number
    allowedFileTypes: string[]
}

type FileUploaderOptions = Partial<RequiredOptions>

interface FileUploaderProps {
    api: (arg: any) => Promise<any>
    inputRef: RefObject<HTMLInputElement>
    options?: FileUploaderOptions
}

interface FileUploaderReturned extends FileUploaderState {
    minFiles: number
    maxFiles: number
    maxFileSize: number
    maxTotalSize: number
    allowedFileTypes: string[]
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onChange: (arg: ChangeEvent<HTMLInputElement> | File[]) => void
    onRemoveFile: (fileId: string | number) => void
    onRemoveFiles: () => void
}

const initialState: FileUploaderState = {
    files: [],
    pending: [],
    status: null,
    next: null,
    isEditable: true,
    uploading: false,
    uploaded: {},
    uploadedSize: 0,
    error: undefined,
}

const reducer = (state: FileUploaderState = initialState, action: FileAction): FileUploaderState => {
    switch (action.type) {
        case FileUploaderAction.LOAD:
            return { ...state, status: FileUploaderStatus.LOADED, files: action.files, isEditable: true }

        case FileUploaderAction.SUBMIT:
            return {
                ...state,
                status: FileUploaderStatus.INIT,
                uploading: true,
                pending: state.files,
                error: undefined,
                isEditable: false,
            }

        case FileUploaderAction.NEXT:
            return { ...state, status: FileUploaderStatus.PENDING, next: action.next }

        case FileUploaderAction.REMOVE_FILE:
            return {
                ...state,
                status: state.files ? FileUploaderStatus.LOADED : null,
                files: state.files?.filter(file => file.id !== action.fileId),
                error: undefined,
            }

        case FileUploaderAction.REMOVE_FILES:
            return { ...state, status: null, files: [], error: undefined }

        case FileUploaderAction.FILE_UPLOADED:
            if (action.prev) {
                return {
                    ...state,
                    next: null,
                    pending: action.pending,
                    uploaded: { ...state.uploaded, [action.prev.id]: action.prev.file },
                }
            }

            return { ...state, next: null, pending: action.pending }

        case FileUploaderAction.FILES_UPLOADED:
            return { ...state, status: FileUploaderStatus.UPLOADED, uploading: false }

        case FileUploaderAction.UPDATE_UPLOADED_SIZE: {
            let uploadedSize = 0

            if (state.files) {
                uploadedSize = convertBytes(
                    state.files.reduce((total, current) => total + current.file.size, 0),
                    { returnAsNumber: true, unit: 'MB' },
                )
            }

            return { ...state, uploadedSize }
        }

        case FileUploaderAction.SET_ERROR:
            return { ...state, status: FileUploaderStatus.ERROR, error: action.error, isEditable: true }

        case FileUploaderAction.RESET_ERROR:
            return { ...state, status: state.files ? FileUploaderStatus.LOADED : null, error: undefined }

        default: return state
    }
}

const clearInput = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
        ref.current.value = ''
    }
}

export const useFileUploader = (props: FileUploaderProps): FileUploaderReturned => {
    const {
        api,
        inputRef,
        options = {},
    } = props

    const defaultOptions: RequiredOptions = {
        minFiles: MIN_FILES,
        maxFiles: MAX_FILES,
        maxFileSize: MAX_FILE_SIZE_MB,
        maxTotalSize: MAX_TOTAL_SIZE_MB,
        allowedFileTypes: [MimeTypes.PNG, MimeTypes.JPEG],
    }

    const calculatedTotalSize = options.maxTotalSize || ((options.maxFiles ?? MAX_FILES) * (options.maxFileSize ?? MAX_FILE_SIZE_MB))

    const resolvedOptions: RequiredOptions = {
        ...defaultOptions,
        ...(Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== undefined))),
        maxTotalSize: calculatedTotalSize,
    }

    const {
        minFiles,
        maxFiles,
        maxFileSize,
        maxTotalSize,
        allowedFileTypes,
    } = resolvedOptions

    const maxFileSizeBytes = convertToBytes(maxFileSize, 'MB')
    const maxTotalSizeBytes = convertToBytes(maxTotalSize, 'MB')

    const [state, dispatch] = useReducer(reducer, initialState)

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if ((state.files?.length || 0) < minFiles) {
            dispatch({
                type: FileUploaderAction.SET_ERROR,
                error: `Необходимо загрузить как минимум ${minFiles} файл(ов).`,
            })
            return
        }

        if (state.files?.length) dispatch({ type: FileUploaderAction.SUBMIT })
    }, [state.files?.length])

    const onChange = (arg: ChangeEvent<HTMLInputElement> | File[]) => {
        const fileList = Array.isArray(arg) ? arg : Array.from(arg.target.files || [])
        let totalSize = convertToBytes(state.uploadedSize, 'MB')

        const validFiles = []

        for (const file of fileList) {
            if (file.size > maxFileSizeBytes) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Файл ${file.name} превышает максимальный размер ${MAX_FILE_SIZE_MB} MB.`,
                })
                continue
            }

            if (!allowedFileTypes.includes(file.type as MimeTypes)) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Тип файла ${file.name} не допустим.`,
                })
                continue
            }

            totalSize += file.size
            if (totalSize > maxTotalSizeBytes) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Общий размер файлов превышает максимальный лимит ${calculatedTotalSize} MB.`,
                })
                return
            }

            dispatch({ type: FileUploaderAction.RESET_ERROR })
            validFiles.push(file)
        }

        if (maxFiles && validFiles.length + (state.files?.length || 0) > maxFiles) {
            dispatch({
                type: FileUploaderAction.SET_ERROR,
                error: `Не может быть загружено более ${maxFiles} файла(ов).`,
            })
            return
        }

        if (validFiles.length) {
            const filesArray = Array.from(validFiles)

            const files = filesArray
                .filter(file => !state.files?.some(existing => existing.file.name === file.name))
                .map((file) => {
                    const src = window.URL.createObjectURL(file)
                    const id = uuidv4()

                    return { file, id, src }
                })

            const newFiles = [...(state.files || []), ...files]

            dispatch({ type: FileUploaderAction.LOAD, files: newFiles })
            dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        }
    }

    const onRemoveFile = (fileId: string | number) => {
        dispatch({ type: FileUploaderAction.REMOVE_FILE, fileId })
        dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        clearInput(inputRef)
    }

    const onRemoveFiles = () => {
        dispatch({ type: FileUploaderAction.REMOVE_FILES })
        dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        clearInput(inputRef)
    }

    useEffect(() => {
        if (state.pending?.length && state.next === null) {
            const next = state.pending[0]
            dispatch({ type: FileUploaderAction.NEXT, next })
        }
    }, [state.next, state.pending])

    // API call, file sending
    useEffect(() => {
        if (state.pending?.length && state.next) {
            const { next } = state

            api(next)
                .then(() => {
                    const prev = next
                    const pending = state.pending?.slice(1)
                    dispatch({ type: FileUploaderAction.FILE_UPLOADED, prev, pending })
                })
                .catch((error) => {
                    dispatch({ type: FileUploaderAction.SET_ERROR, error })
                })
        }
    }, [state, api])

    // End of processing
    useEffect(() => {
        if (!state.pending?.length && state.uploading) {
            dispatch({ type: FileUploaderAction.FILES_UPLOADED })
        }
    }, [state.pending?.length, state.uploading])

    return {
        ...state,
        ...resolvedOptions,
        onSubmit,
        onChange,
        onRemoveFile,
        onRemoveFiles,
    }
}
