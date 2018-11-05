const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpackConfig = require('./../../../webpack.config.js');

const app = express();

module.exports = () =>
    new Promise(resolve => {
        if (process.env.NODE_ENV === 'development') {
            const compiler = webpack(
                webpackConfig({ NODE_ENV: process.env.NODE_ENV })
            );

            compiler.hooks.done.tap({ name: 'test' }, () => {
                resolve();
            });
            app.use(
                webpackDevMiddleware(compiler, {
                    noInfo: false,
                    publicPath: '/assets/',
                    quiet: true,
                    serverSideRender: true,
                    stats: 'minimal'
                })
            );
            app.use(webpackHotMiddleware(compiler));
            app.listen(parseInt(process.env.PORT, 10) + 1 || 8001);
        } else {
            resolve();
        }
    });
