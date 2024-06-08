import webpack from 'webpack'
import { BuildOptions } from '../types/config'

import { buildCssLoader } from '../loaders/buildCssLoader'
import { buildSvgLoader } from '../loaders/buildSvgLoader'
import { buildFileLoader } from '../loaders/buildFileLoader'
import { buildBabelLoader } from '../loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const cssLoader = buildCssLoader(options)
    const svgLoader = buildSvgLoader()
    // const svgSpriteLoader = buildSvgSpriteLoader()
    const fileLoader = buildFileLoader()
    const babelLoader = buildBabelLoader()

    return [
        svgLoader,
        fileLoader,
        babelLoader,
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        cssLoader,
    ]
}
