const path = require('path');
const mysql = require("mysql");

require("dotenv").config({
    path: path.join(__dirname, './../../config/.env')
});

const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

if (!process.env.DB_NAME){
    console.log('The database has not been created because your .env configuration is incorrect. Please check the file located at ./config/.env');
    process.exit();
} else {
    connexion.connect( (err) => {
        if (err) throw err;
        console.log("Connected to MySQL.")
        console.log("Creating Database...");
        const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
        connexion.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Database created");
            process.exit();
        });
    });
}
