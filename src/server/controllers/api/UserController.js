/*
* User controller.
*
*/
const models = require('./../../models');
const contactStatus = require('./../../enums/contactStatus.js');
class UserController {
    async findAll(queryParams) {
        logger.debug('UserController | findAll');
        return {
            data: [
                ...await models.User.findAll(null, null, queryParams)
            ]
        };
    }

    async findById(id, queryParams) {
        logger.debug('UserController | findbyId');
        if (!id) {
            return new Error('Usercontroller.findById needs an id.');
        }
        let user = await models.User.findById(id, queryParams);
        user.contacts = (await models.Contact._model
            .forge()
            .query({
                where: { sender_id: user.id },
                orWhere: { sendee_id: user.id },
                andWhere: {status: contactStatus.ACCEPTED}
            })
            .fetchAll({withRelated: ['sendee', 'sender']}))
            .toJSON()
            .map(contact => contact.sender_id === user.id ? contact.sendee : contact.sender);
        return {
            data: {
                ...user
            }
        };
    }

    async create(data) {
        logger.debug('UserController | create');
        return {
            data: {
                ...await models.User.create(data)
            }
        };
    }

    async destroy(id, queryParams) {
        logger.debug('UserController | destroy');
        return {
            data: {
                ...await models.User.destroy(id, queryParams)
            }
        };
    }

    async update(id, data) {
        logger.debug('UserController | update');
        return {
            data: {
                ...await models.User.update(id, {}, data)
            }
        };
    }
}

module.exports = new UserController();
