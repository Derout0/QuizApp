import {classNames} from "../../shared/lib/classNames/classNames";

interface MainPageProps {
    className?: string
}

export const MainPage = (props: MainPageProps) => {
    const {
        className
    } = props

    return (
        <div className={classNames("1")}>
            Main Page
        </div>
    )
}