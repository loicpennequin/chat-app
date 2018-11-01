module.exports = name => {
    const uName = name.slice(0,1).toUpperCase() + name.slice(1);
    return `/*
* The ${uName} Model.
*
*/
const Bookshelf = require('../services/database.js');

const ${uName} = Bookshelf.Model.extend({
    tableName: '${name}s',
    hasTimestamps: true,
});

module.exports = ${uName};`
};
