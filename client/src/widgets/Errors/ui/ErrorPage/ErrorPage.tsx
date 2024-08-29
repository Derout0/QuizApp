import * as cls from './ErrorPage.module.scss'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/shared/ui/Button/Button'

export const ErrorPage = (props: FallbackProps) => {
    const {
        error,
        resetErrorBoundary,
    } = props

    return (
        <div className={cls.ErrorPage}>
            Something going wrong!
            {error.message}
            <Button theme="filled" onClick={resetErrorBoundary}>RELOAD</Button>
        </div>
    )
}
