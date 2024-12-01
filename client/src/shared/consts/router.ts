// For use in routeConfig
export const AppRoutes = {
    MAIN: '/',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    LIBRARY: {
        ROOT: 'library',
        MODULES: 'modules',
        FOLDERS: 'folders',
    },
    NOT_FOUND: '*',
}

// For use in the App
export const AppPaths = {
    MAIN: AppRoutes.MAIN,
    PROFILE: (id: string | number) => `/${AppRoutes.PROFILE}/${id}`,
    SETTINGS: AppRoutes.SETTINGS,
    LIBRARY: AppRoutes.LIBRARY.ROOT,
    LIBRARY_MODULE: (id: string | number) => `/${AppRoutes.LIBRARY.ROOT}/${AppRoutes.LIBRARY.MODULES}/${id}`,
    LIBRARY_MODULES: `/${AppRoutes.LIBRARY.ROOT}/${AppRoutes.LIBRARY.MODULES}`,
    LIBRARY_FOLDER: (id: string | number) => `/${AppRoutes.LIBRARY.ROOT}/${AppRoutes.LIBRARY.FOLDERS}/${id}`,
    LIBRARY_FOLDERS: `/${AppRoutes.LIBRARY.ROOT}/${AppRoutes.LIBRARY.FOLDERS}`,
}
