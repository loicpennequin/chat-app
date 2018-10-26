/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

const path = require('path');
const merge = require('webpack-merge');
const commonCfg = require(path.join(
    __dirname,
    'config/webpack/webpack.common.js'
));
const clientCfg = require(path.join(
    __dirname,
    'config/webpack/webpack.client.js'
));
const serverCfg = require(path.join(
    __dirname,
    'config/webpack/webpack.server.js'
));
const dotenv = require('dotenv');

dotenv.config({
    path: './config/.env'
});

module.exports = env => [
    merge(commonCfg({...env, port: process.env.PORT || 8000}), clientCfg({...env, port: process.env.PORT || 8000})),
    merge(commonCfg({...env, port: process.env.PORT || 8000}), serverCfg)
];
