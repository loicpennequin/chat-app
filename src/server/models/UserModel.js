/*
* The User Model.
*
*/
const Bookshelf = require('../services/database.js');

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

module.exports = User;
