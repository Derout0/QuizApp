import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CheckPasswordForm } from '@/features/check-password/ui/CheckPasswordForm/CheckPasswordForm'

interface CheckPasswordModalProps {
    className?: string
    title?: string
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export const CheckPasswordModal = (props: CheckPasswordModalProps) => {
    const {
        className,
        title,
        isOpen,
        onClose,
        onSuccess,
    } = props

    return (
        <Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose}>
            <CheckPasswordForm onClose={onClose} onSuccess={onSuccess} title={title} />
        </Modal>
    )
}
