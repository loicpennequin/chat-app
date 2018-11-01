/*
* The Contact Model.
*
*/
const Bookshelf = require('./../database.js');
const Model = require('./../_modelHandler.js');

const Contact = Bookshelf.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true
});

module.exports = new Model(Contact, 'Contact');
