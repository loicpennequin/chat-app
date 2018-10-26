module.exports = name => {
    const uName = name.slice(0,1).toUpperCase() + name.slice(1);
    return `/*
* ${uName} controller.
*
*/
const models = require('./../../models');

class ${uName}Controller {
    async findAll(queryParams) {
        return {
            data: {
                ${name}s: (await models.${uName}.findAll(queryParams)).toJSON()
            }
        };
    }

    async findbyId(id, queryParams) {
        return {
            data: {
                ${name}s: (await models.${uName}.findOne(id, queryParams)).toJSON()
            }
        };
    }

    async create(data) {
        return {
            data: {
                ${name}: (await models.${uName}.create(data)).toJSON()
            }
        };
    }

    async destroy(id, queryParams) {
        return {
            data: {
                ${name}: (await models.${uName}.destroy(id, queryParams)).toJSON()
            }
        };
    }

    async update(id, data) {
        return {
            data: {
                ${name}: (await models.${uName}.update(id, {}, data)).toJSON()
            }
        };
    }
}

module.exports = new ${uName}Controller();`;
};
