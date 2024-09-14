import type { FunctionComponent, SVGAttributes } from 'react'

export interface SidebarItemType {
    name: string
    path: string
    Icon: FunctionComponent<SVGAttributes<SVGElement>>
}

export interface SidebarBlockType {
    title?: string
    items: SidebarItemType[]
}
