import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildDevServer, buildLoaders, buildPlugins, buildResolvers } from "./builders/build";

export function buildWebpackConfig (options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        plugins: buildPlugins(options),
        resolve: buildResolvers(),
        module: {
            rules: buildLoaders(options)
        },

        // Dev Server
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'inline-source-map' : undefined
    }
}