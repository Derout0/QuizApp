import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { BuildOptions } from 'config/build/types/config'

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const { paths, isProd, isDev } = options
    let productionPlugins: webpack.WebpackPluginInstance[] = []

    const basePlugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ // For global project variables
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ]

    if (isProd) {
        productionPlugins = [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
            }),
        ]
    }

    return [...basePlugins, ...productionPlugins]
}
