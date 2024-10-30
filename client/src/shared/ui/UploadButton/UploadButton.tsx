import type { ChangeEvent, HTMLAttributes, ReactElement, RefObject } from 'react'
import { cloneElement } from 'react'
import { HiddenInput } from '@/shared/ui/Input'
import type { MimeTypes } from '@/shared/consts/common'

interface UploadButtonProps extends HTMLAttributes<HTMLInputElement> {
    children: ReactElement
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    multiple?: boolean
    accept?: MimeTypes[]
    inputRef: RefObject<HTMLInputElement>
}

export const UploadButton = (props: UploadButtonProps) => {
    const {
        children,
        onChange,
        multiple,
        accept,
        inputRef,
        ...other
    } = props

    const handleClick = () => {
        inputRef?.current?.click()
    }

    const mimeTypes = accept?.toString()

    return (
        <>
            {cloneElement(children, { onClick: handleClick })}
            <HiddenInput ref={inputRef} onChange={onChange} type="file" accept={mimeTypes} multiple={multiple} {...other} />
        </>
    )
}
