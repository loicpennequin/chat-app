/*
* The User Model.
*
*/
const Bookshelf = require('./../database.js');
const Model = require('./../_modelHandler.js');

const User = Bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    bcrypt: { field: 'password' },
    hidden: ['password'],
    validations: {
        username: 'isRequired',
        email: 'isRequired',
        password: 'isRequired'
    }
});

module.exports = new Model(User, 'User');
