import * as cls from './NotFoundPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export const NotFoundPage = () => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [])}>
            Страница не найдена
        </div>
    )
}
