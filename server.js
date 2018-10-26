require('dotenv').config({
    path: 'config/.env'
});
const logger = require('./src/server/logger/logger.js');
const webpack = require('./src/server/middlewares/webpack.js');

logger.info(`=============================================================================
      Building App...STARTED
      =============================================================================`);

webpack()
    .then(() => {
        logger.info(`=============================================================================
      Building App...DONE
      =============================================================================`);
        const http = require('./src/server/app.js');
        http.listen(process.env.PORT || 8000, () => {
            const header = require('gradient-string')('tomato', 'magenta', 'cyan')(
                `POWERED BY RN-INFINITY`
            );
            return logger.info(`=============================================================================
                      ${header}
      =============================================================================
      server started on port ${process.env.PORT}
      API available at http://localhost/${process.env.port}/api
      App available at http://localhost/${process.env.port}
      =============================================================================`);
        });
    })
    .catch(err => logger.error(err.stack));
