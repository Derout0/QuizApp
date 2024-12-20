export type BuildMode = 'development' | 'production'

export interface BuildPaths {
    entry: string
    build: string
    html: string
    src: string
}

export interface BuildEnv {
    mode: BuildMode
    port: number
    serverURL: string
    apiURL: string
}

export interface BuildOptions {
    mode: BuildMode
    paths: BuildPaths
    isDev: boolean
    isProd: boolean
    port: number
    serverURL: string
    apiURL: string
}
