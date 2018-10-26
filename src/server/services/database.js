/**
 * Bookshelf config
 * Handles connextion to the database.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */
const dbConfig = require('./../../../knexfile.js');
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);
const validator = require('validator');

validator.isRequired = val => val != null && val != undefined;

bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin('pagination');
bookshelf.plugin('bookshelf-validate', {
    validator,
    validateOnSave: false
});
bookshelf.plugin(require('bookshelf-bcrypt'));

module.exports = bookshelf;
