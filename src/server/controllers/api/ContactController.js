/*
* Contact controller.
*
*/
const models = require('./../../models');

class ContactController {
    async findByUser(id, queryParams) {
        logger.debug('ContactController | findByUser');
        return {
            data: [
                ...(await models.Contact._model
                    .forge()
                    .query({
                        where: { sender_id: id },
                        orWhere: { sendee_id: id }
                    })
                    .fetchAll()).toJSON()
            ]
        };
    }

    async findById(id, queryParams) {
        logger.debug('ContactController | findbyId');
        return {
            data: {
                ...await models.Contact.findOne(id, queryParams)
            }
        };
    }

    async create(data) {
        logger.debug('ContactController | create');
        return {
            data: {
                ...(await models.Contact.create(data))
            }
        };
    }

    async destroy(id, queryParams) {
        logger.debug('ContactController | destroy');
        return {
            data: {
                ...(await models.Contact.destroy(id, queryParams))
            }
        };
    }

    async update(id, data) {
        logger.debug('ContactController | update');
        return {
            data: {
                ...(await models.Contact.update(id, {}, data))
            }
        };
    }
}

module.exports = new ContactController();
