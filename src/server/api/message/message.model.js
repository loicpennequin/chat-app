/*
* The User Model.
*
*/
const Bookshelf = require('./../database.js');
const Model = require('./../_modelHandler.js');

const Message = Bookshelf.Model.extend({
    tableName: 'messages',
    hasTimestamps: true,
    sender: function() {
        return this.belongsTo('User', 'sender_id');
    },

    sendee: function() {
        return this.belongsTo('User', 'sendee_id');
    }
});

module.exports = new Model(Message, 'Message');
