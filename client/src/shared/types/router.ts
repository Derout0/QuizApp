import type { RouteObject } from 'react-router/dist/lib/context'

export type AppRouteObject = RouteObject & {
    auth?: boolean
    children?: AppRouteObject[]
}
