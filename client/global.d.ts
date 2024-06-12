declare module '*.module.scss';

declare module '*.svg' {
    import React = require('react')
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

declare const __IS_DEV__: boolean
