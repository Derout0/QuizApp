import { Modal } from '@/shared/ui/Modal/Modal'
import type { AuthFormTabId } from '../../model/types/tabs'
import { AuthForm } from '../../ui/AuthForm/AuthForm'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultTabId?: AuthFormTabId
}

export const AuthModal = (props: AuthModalProps) => {
    const {
        isOpen,
        onClose,
        defaultTabId,
    } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <AuthForm onClose={onClose} onSuccess={onClose} defaultTabId={defaultTabId} />
        </Modal>
    )
}
