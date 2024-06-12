export function buildFileLoader() {
    return {
        test: /\.(png|jpe?g|svg|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }
}
