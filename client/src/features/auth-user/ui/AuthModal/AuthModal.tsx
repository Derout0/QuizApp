import { Modal } from '@/shared/ui/Modal/Modal'
import { AuthForm } from '@/features/auth-user/ui/AuthForm/AuthForm'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = (props: AuthModalProps) => {
    const {
        isOpen,
        onClose,
    } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <AuthForm onClose={onClose} />
        </Modal>
    )
}
