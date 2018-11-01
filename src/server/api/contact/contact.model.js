/*
* The Contact Model.
*
*/
const Bookshelf = require('./../database.js');
const Model = require('./../_modelHandler.js');

const Contact = Bookshelf.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true,

    sender: function() {
        return this.belongsTo('User', 'sender_id');
    },

    sendee: function() {
        return this.belongsTo('User', 'sendee_id');
    }
});

module.exports = new Model(Contact, 'Contact');
