import type { SidebarBlockType, SidebarItemType } from './types/sidebar'
import HomeIcon from '@/shared/assets/icons/Home.svg'
import FolderIcon from '@/shared/assets/icons/Folder.svg'
import NotificationIcon from '@/shared/assets/icons/Notification.svg'

export const SidebarNavigationItems: SidebarItemType[] = [
    {
        name: 'Главная',
        path: '/',
        Icon: HomeIcon,
    },
    {
        name: 'Библиотека',
        path: '/',
        Icon: FolderIcon,
    },
    {
        name: 'Оповещения',
        path: '/',
        Icon: NotificationIcon,
    },
]

export const SidebarEducationItems: SidebarItemType[] = [
    {
        name: 'Карточки',
        path: '/',
        Icon: FolderIcon,
    },
]

export const SidebarBlocks: SidebarBlockType[] = [
    {
        title: 'Навигация',
        items: SidebarNavigationItems,
    },
    {
        title: 'Обучающий режим',
        items: SidebarEducationItems,
    },
]
