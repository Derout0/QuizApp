declare module '*.module.scss';

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content
}

declare module '*.svg?url' {
    const src: string
    export default src
}

declare const __IS_DEV__: boolean
declare const __API_URL__: string
declare const __SERVER_URL__: string
