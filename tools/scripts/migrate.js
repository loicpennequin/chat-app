const path = require('path');
const dbConfig = require(path.join(__dirname, './../../knexfile.js'));

if (!process.env.DB_NAME){
    console.log('The migrations have been cancelled because your .env configuration is incorrect. Please check the file located at ./config/.env');
    process.exit();
} else {
    const knex = require('knex')(dbConfig);
    knex.migrate.latest()
    .then(() => {
        console.log('migrations done successfully.');
        process.exit();
    })
}
