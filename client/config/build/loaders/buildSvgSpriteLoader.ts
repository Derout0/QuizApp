export function buildSvgSpriteLoader() {
    return {
        test: /\.svg$/,
        use: ['svg-sprite-loader'],
    }
}
