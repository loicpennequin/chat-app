const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = env => ({
	target: 'web',
	entry: {
		app: env.NODE_ENV === 'production'
            ? [
                '@babel/polyfill',
			    path.resolve(__dirname, '../../src/client/index.js')
		      ]
            : [
                '@babel/polyfill',
			    'webpack-hot-middleware/client?path=http://localhost:8001/__webpack_hmr',
			    path.resolve(__dirname, '../../src/client/index.js')
		      ]
	},
    module: {
        rules: [
            {
                test: /\.sass$/,
                exclude: /app.sass/,
                use: [
                    'css-hot-loader',
                    env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName:
                                '[name]-[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: require(path.join(
                                __dirname,
                                '../../src/client/styles/settings/index.js'
                            ))
                        }
                    }
                ]
            },
            //GLobal Styles
            {
                test: /app.sass/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
	output: {
		path: path.resolve(__dirname, '../../public/assets')
	},
    plugins: [
        new webpack.DefinePlugin({
            __IS_BROWSER__ : true,
        }),
        new MiniCssExtractPlugin(),
        new ManifestPlugin({
            seed: {
                permissions: ["cookies", "*://localhost:800/*"]
            }
        }),
        env.NODE_ENV === 'production' && new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
        env.NODE_ENV === 'production' && new CompressionPlugin()
    ].filter(plugin => plugin !== false),
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            (env.NODE_ENV === 'production') && new UglifyWebpackPlugin({
                uglifyOptions: {
                    compress: {
                        collapse_vars: false
                    }
                }
            })
        ].filter(plugin => plugin !== false),
    }
});
