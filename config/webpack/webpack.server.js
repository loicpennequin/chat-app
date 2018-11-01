const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
	target: 'node',
	externals: [nodeExternals()],
    entry: {
		['app.ssr']: [
            '@babel/polyfill',
            path.resolve(__dirname, '../../src/client/index.js')
        ]
	},
    module: {
        rules: [
            {
                test: /\.sass$/,
                exclude: /app.sass/,
                use: [
                    {
                        loader: 'css-loader/locals',
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
                    {
                        loader: 'css-loader/locals'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
	output: {
		path: path.resolve(__dirname, '../../src/server/views'),
		library: 'default',
		libraryTarget: 'commonjs2',
	},
    plugins: [
        new webpack.DefinePlugin({
            __IS_BROWSER__ : false
        })
    ]
};
