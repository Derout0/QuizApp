import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import type { BuildOptions } from 'config/build/types/config'

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const { paths, isProd, isDev, apiURL } = options

    let productionPlugins: webpack.WebpackPluginInstance[] = []

    const basePlugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ // For global project variables
            __IS_DEV__: JSON.stringify(isDev),
            __API_URL__: JSON.stringify(apiURL),
        }),
        // new BundleAnalyzerPlugin(),
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
