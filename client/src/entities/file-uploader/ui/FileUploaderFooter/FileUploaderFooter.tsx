import * as cls from './FileUploaderFooter.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Button } from '@/shared/ui/Button/Button'

interface FileUploaderFooterProps {
    className?: string
}

export const FileUploaderFooter = (props: FileUploaderFooterProps) => {
    const {
        className,
    } = props

    return (
        <HStack justify="center" className={classNames(cls.FileUploaderFooter, {}, [className])}>
            <Button type="submit" theme="filled" color="primary">Отправить файл(ы)</Button>
        </HStack>
    )
}
