import { useCallback, useEffect, useState } from 'react'

interface UseModalProps {
    defaultVisible?: boolean
}

export const useModal = (props: UseModalProps = {}) => {
    const {
        defaultVisible = false,
    } = props

    const [visible, setVisible] = useState(defaultVisible)

    const open = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close()
        }
    }, [close])

    useEffect(() => {
        if (visible) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown, visible])

    return {
        visible,
        open,
        close,
    }
}
