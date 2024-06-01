import {RouteProps} from "react-router-dom";
import { MainPage } from '@/pages/MainPage'
import { AppRoutes, getRouteMain } from "@/shared/consts/router";

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: undefined
    }
}