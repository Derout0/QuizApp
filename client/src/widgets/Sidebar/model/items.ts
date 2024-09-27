import type { SidebarBlockType, SidebarItemType } from './types/sidebar'
import SettingsIcon from '@/shared/assets/icons/Settings.svg'
import HomeIcon from '@/shared/assets/icons/Home.svg'
import FolderIcon from '@/shared/assets/icons/Folder.svg'
import NotificationIcon from '@/shared/assets/icons/Notification.svg'
import { getRouteSettings } from '@/shared/consts/router'

export const SidebarNavigationItems: SidebarItemType[] = [
    {
        name: 'Главная',
        path: '/',
        Icon: HomeIcon,
    },
    {
        name: 'Библиотека',
        path: '/profile/39',
        Icon: FolderIcon,
    },
    {
        name: 'Оповещения',
        path: '/',
        Icon: NotificationIcon,
    },
    {
        name: 'Настройки',
        path: getRouteSettings(),
        Icon: SettingsIcon,
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
