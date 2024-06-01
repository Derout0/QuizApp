import webpack from "webpack";
import {buildCssLoader} from "../loaders/buildCssLoader";
import {BuildOptions} from "../types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const cssLoader = buildCssLoader(options)

    return [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        cssLoader
    ]
}