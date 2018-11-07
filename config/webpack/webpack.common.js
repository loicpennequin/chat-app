/**
 * Common cofiguration between client-side and SSR bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = env => ({
	mode: env.NODE_ENV,
	devtool: env.NODE_ENV === 'development' ? 'eval-source-map' : 'inline-source-maps',
	output: {
		filename: '[name].js',
		publicPath: '/assets/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: true,
                        cacheDirectory: true,
					}
				}
			},
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: env.NODE_ENV === 'production'
                        }
                    }
                ]
            },
            {
                test: /locales/,
                loader: '@alienfast/i18next-loader'
            }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __ENV__ : '"' + env.NODE_ENV + '"',
            __PORT__: env.port
        }),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /en|fr/
        ),
		new WriteFilePlugin(),
		new CleanWebpackPlugin(['public/assets', 'src/server/views'], {
			root: path.join(__dirname, '../../'),
		})
	],
    stats: 'verbose'
});
