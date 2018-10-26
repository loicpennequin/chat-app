const fs = require('fs');
const logger = require('./../../logger/logger.js');

const toSlice = 'Controller.js'.length;
let _controllers = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(file => {
        _controllers[file.slice(0, -toSlice)] = require(`./${file}`);
    });

const _handler = (promise, params) => async (req, res, next) => {
    const promiseParams = params ? params(req, res, next) : [];
    try {
        const { status, headers, data } = await promise(...promiseParams);
        return res
            .status(status || 200)
            .set(headers || {})
            .json(
                Object.assign(
                    {},
                    { token: req.token },
                    {data : data || { message: 'OK' }}
                )
            );
    } catch (err) {
        logger.error(err.stack);
        return res.status(err.status || 500).json({ error: err.message });
    }
};

module.exports = {
    withHandler: Object.keys(_controllers).reduce(
        (acc, key) =>
            Object.assign(acc, {
                [key]: (method, params) =>
                    _handler(_controllers[key][method], params)
            }),
        {}
    ),
    ..._controllers
};
