const app = require('express')();
const logRequest = require('./../middlewares/logRequest.js');
const wwwRouter = require('./routers/wwwRouter.js');
const authRouter = require('./routers/authRouter.js');
const { publicRouter, privateRouter } = require('./routers/apiRouter.js');
const ensureAuth = require('./../middlewares/ensureAuth.js');

app.use('/api', logRequest);
app.use('/api', publicRouter);
app.use('/api', authRouter);
app.use('/api', ensureAuth, privateRouter);
app.use('/', wwwRouter);

module.exports = app;
