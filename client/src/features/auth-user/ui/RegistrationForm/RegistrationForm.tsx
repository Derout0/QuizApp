import * as cls from './RegistrationForm.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'

interface RegistrationFormProps {
    className?: string
    onClose: () => void
}

export const RegistrationForm = (props: RegistrationFormProps) => {
    const {
        className,
        onClose,
    } = props

    return (
        <VStack gap="20" className={classNames('', {}, [className])}>
            <VStack gap="20">
                <Input placeholder="Введите username" label="Username" />
                <Input placeholder="Введите email" label="Email" />
                <Input placeholder="Введите пароль" label="Password" />
            </VStack>
            <HStack gap="12" justify="end">
                <Button onClick={onClose} theme="outlined" color="secondary">Отмена</Button>
                <Button theme="filled" color="primary">Зарегистрироваться</Button>
            </HStack>
        </VStack>
    )
}
