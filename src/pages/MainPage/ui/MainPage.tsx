import {classNames} from "@/shared/lib/classNames/classNames";

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const {
        className
    } = props

    return (
        <div className={classNames("1")}>
            Main Page
        </div>
    )
}

export default MainPage