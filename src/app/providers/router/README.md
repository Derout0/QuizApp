# Project Router Documentation

## Описание

Проект включает в себя настройку маршрутизации для 
React-приложения с использованием `react-router-dom`. 
Использование `Suspense` для ленивой загрузки компонентов.

## Основные файлы
### 1. `AppRouter.tsx`

Содержит основной компонент маршрутизации для приложения. 
Используется в `App.tsx`. По значениям из `routeConfig` 
(объект определяющий конфигурацию маршрутов), оборачивает каждый путь в обертку.

### 2. `routeConfig`
Обьект, содержащий конфигурацию основных маршрутов приложения. Где ключ - 
идентификатор маршрута, а значение - соответствующие реквизиты.

Пример:
``` typescript
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: undefined
    }
};
```

## Вспомогательные файлы в `shared/`
### 1. `consts/router.ts`
Хранит в себе enum `AppRoutes` - перечисление идентификаторов основных маршрутов.

А также вспомогательные функции для получения необходимых путей. 
Используются во всем приложении

Пример:
``` typescript
export const getRouteMain = () => '/'
export const getRouteProfile = () => '/profile'
```
