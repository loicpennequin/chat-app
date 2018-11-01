module.exports =  (promise, params) => async (req, res, next) => {
    try {
        const { status, headers, data } = await promise(...params);
        return res
            .status(status || 200)
            .set(headers || {})
            .json(data || { message : 'OK'});
    } catch (err) {
        logger.error(err.stack);
        return res.status(err.status || 500).json({ error: err.message });
    }
};
