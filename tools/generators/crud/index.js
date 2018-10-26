(async function(){
    const { promisify } = require('util');
    const argv = require('yargs').argv;
    const path = require('path');
    const cfg = require('./../../../config/constants.js').GENERATORS;

    try{
        if ( !argv.name ){
            console.log('no name specified. The syntax for this script is : ');
            console.log('npm run generate:crud -- --name=<name>');
            process.exit();
        }

        const fs = require('fs');
        const read = promisify(fs.readFile);
        const write = promisify(fs.writeFile);

        const name = argv.name;
        const uName = name.slice(0,1).toUpperCase() + name.slice(1);

        const makeController = async () => {
            const controllerTpl = require('./controllerTemplate.js')(name);
            const controllerPath = path.join(cfg.CONTROLLERS_PATH, `${uName}Controller.js`);

            await write(controllerPath, controllerTpl);
            console.log(`Controller file created at ${controllerPath}.`);
        };

        const makeModel = async () => {
            const modelTpl = require('./modelTemplate.js')(name);
            const modelPath = path.join(cfg.MODELS_PATH, `${uName}Model.js`);

            await write(modelPath, modelTpl);
            console.log(`Model file created at${modelPath}.`);
        };

        const makeRoutes = async() => {
            const routesTpl = require('./routesTemplate.js')(name);
            const routesPath = path.join(cfg.ROUTES_PATH, `${name}Routes.js`);

            await write(routesPath, routesTpl);
            console.log(`Routes file created at ${routesPath}.`);
        };

        const updateApiRouter = async () => {
            let apiRouter = (await read(cfg.API_ROUTER_PATH))
            .toString()
            .split("\n");

            const marker = apiRouter.findIndex(line => line === '// Generated routers here
');
            const toAdd = `const ${name}Routes = require('./apiRoutes/${name}Routes.js');
router.use(${name}Routes);`;

            apiRouter.splice(marker+1, 0, toAdd);
            apiRouter = apiRouter.join("\n");

            await write(cfg.API_ROUTER_PATH, apiRouter);
            console.log('apiRouter.js updated.');
        };

        const promises = [makeController(), makeModel(), makeRoutes(), updateApiRouter()];

        await Promise.all(promises);
        console.log('CRUD generation successful.');
        process.exit();
    } catch(err){
        console.log(err.stack);
    }
})();
