const User = require('./user.model.js');
const Contact = require('./../contact/contact.model.js');
const contactStatus = require('./../../enums/contactStatus.js');

const UserController = function() {
    this._getContacts = async id =>
        (await Contact._model
            .forge()
            .query(qb => {
                qb.where(function() {
                    this.where('sendee_id', id).orWhere('sender_id', id);
                }).andWhere({ status: contactStatus.ACCEPTED });
            })
            .fetchAll({ withRelated: ['sendee', 'sender'] }))
            .toJSON()
            .map(
                contact =>
                    contact.sender_id === id ? contact.sendee : contact.sender
            );

    this._getContactRequests = async id =>
        (await Contact._model
            .forge()
            .query(qb => {
                qb.where(function() {
                    this.where('sendee_id', id).orWhere('sender_id', id);
                }).andWhere({ status: contactStatus.PENDING });
            })
            .fetchAll({ withRelated: ['sendee', 'sender'] }))
            .toJSON()
            .reduce(
                (acc, contact) => {
                    if (contact.sender_id === id) {
                        acc.sent.push(contact.sendee);
                    } else {
                        acc.recieved.push(contact.sender);
                    }
                    return acc;
                },
                { sent: [], recieved: [] }
            );

    this._getUserInfo = async user =>
        Object.assign(user, {
            contacts: await this._getContacts(user.id),
            contactRequests: await this._getContactRequests(user.id)
        });

    this.findAll = async queryParams => {
        logger.debug('UserController | findAll');
        return {
            data: [...(await User.findAll(null, null, queryParams))]
        };
    };

    this.findOne = async (query, options) => {
        logger.debug('UserController | findOne');
        const user = await User.findOne(query, options);

        return {
            data: {
                ...(await this._getUserInfo(user))
            }
        };
    };

    this.findById = async (id, queryParams) => {
        logger.debug('UserController | findbyId');
        const user = await User.findById(id, queryParams);

        return {
            data: {
                ...(await this._getUserInfo(user))
            }
        };
    };

    this.create = async data => {
        logger.debug('UserController | create');
        return {
            data: {
                ...(await User.create(data))
            }
        };
    };
};

module.exports = new UserController();
