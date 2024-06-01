import cls from './Button.module.scss';

interface ButtonProps {
    className?: string
}
export const Button = (props: ButtonProps) => {
    const {
        className
    } = props

    return (
        <div className={cls.red}></div>
    )
}