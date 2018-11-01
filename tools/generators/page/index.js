(async function(){
    const { promisify } = require('util');
    const argv = require('yargs').argv;
    const path = require('path');
    const cfg = require('./../../../config/constants.js').GENERATORS;

    try{
        if ( !argv.name ){
            console.log('no name specified. The syntax for this script is : ');
            console.log('npm run generate:page -- --name=<name>');
            process.exit();
        }

        const fs = require('fs');
        const read = promisify(fs.readFile);
        const write = promisify(fs.writeFile);
        const mkdir = promisify(fs.mkdir);

        const name = argv.name;
        const uName = name.slice(0,1).toUpperCase() + name.slice(1);

        const makeComponent = async () => {
            const componentTpl = require('./componentTemplate.js')(name);
            const componentPath = path.join(cfg.PAGES_PATH, `${uName}/${uName}.jsx`);
            const sassPath = path.join(cfg.PAGES_PATH, `${uName}/${uName}.sass`);

            await mkdir(path.join(cfg.PAGES_PATH, `${uName}`));
            await write(componentPath, componentTpl);
            await write(sassPath, '');
            console.log(`Component file created at ${componentPath}`);
        };

        const updateRoutesService = async () => {
            let routes = (await read(cfg.ROUTES_SERVICE_PATH)).toString();

            const importStr = `\nimport ${uName}, { fetchData as ${uName}Fetch } from './../../components/pages/${uName}/${uName}.jsx';`;
            const lastImport = routes.lastIndexOf('import');

            if ( lastImport > -1 ){
                const firstSemicolonAfterLastImport = routes.slice(lastImport).indexOf(';');
                routes = routes.slice(0, lastImport + firstSemicolonAfterLastImport+1) + importStr + routes.slice(lastImport + firstSemicolonAfterLastImport+1);
            } else {
                routes = importStr + "\n" + routes;
            }

            let routesArray = routes.slice(routes.indexOf('['), routes.indexOf(']'))
            routesArray +=`    ${routes.charAt(routes.indexOf(']')-1) === ',' ? '': ','}{
    path: '/${(!argv.root) ? name.toLowerCase() : ''}',
    exact: true,
    component: ${uName},
    fetchFn: ${uName}Fetch,
    authLevel: ${argv.private ? "'private'" : "'public'"}
},`;
            routes = routes.slice(0,routes.indexOf('[')) + routesArray + routes.slice(routes.indexOf(']'));

            await write(path.join(__dirname, './../../../src/client/resources/services/routesService.js'), routes);
            console.log('routesService.js updated.');
        };


        const promises = [makeComponent(), updateRoutesService()];

        await Promise.all(promises);
        console.log('Page generation successful.');
        process.exit();
    } catch(err){
        console.log(err.stack);
    }
})();
