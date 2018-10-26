/*
* The User Model.
*
*/
const Bookshelf = require('../services/database.js');

const Contact = Bookshelf.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true,

    sender : function(){
        return this.belongsTo('User', 'sender_id');
    },

    sendee: function(){
        return this.belongsTo('User', 'sendee_id');
    }
});

module.exports = Contact;
