import * as cls from './LoginForm.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'

interface LoginFormProps {
    className?: string
    onClose: () => void
}

export const LoginForm = (props: LoginFormProps) => {
    const {
        className,
        onClose,
    } = props

    return (
        <VStack gap="20" className={classNames('', {}, [className])}>
            <VStack gap="12">
                <Input placeholder="Введите email" label="Email" />
                <Input placeholder="Введите пароль" label="Password" />
            </VStack>
            <HStack gap="12" justify="end">
                <Button onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                <Button theme="filled" color="primary">Войти</Button>
            </HStack>
        </VStack>
    )
}
