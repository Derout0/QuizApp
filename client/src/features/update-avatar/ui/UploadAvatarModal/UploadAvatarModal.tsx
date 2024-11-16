import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal/Modal'
import { UploadAvatarForm } from '../UploadAvatarForm/UploadAvatarForm'

interface UploadAvatarModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const UploadAvatarModal = (props: UploadAvatarModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <UploadAvatarForm />
        </Modal>
    )
}
