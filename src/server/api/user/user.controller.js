const User = require('./user.model.js');
const Contact = require('./../contact/contact.model.js');
const contactStatus = require('./../../enums/contactStatus.js');

const UserController = function() {
    this._formatContactRequest = (contact, id) =>
        Object.assign(
            {},
            { date: contact.created_at, request_id: contact.id },
            {
                ...contact[contact.sender_id === id ? 'sendee' : 'sender']
            }
        );

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
            .map(contact => this._formatContactRequest(contact, id));

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
                        acc.sent.push(this._formatContactRequest(contact, id));
                    } else {
                        acc.recieved.push(
                            this._formatContactRequest(contact, id)
                        );
                    }
                    return acc;
                },
                { sent: [], recieved: [] }
            );

    this._getUserInfo = async user => {
        return Object.assign(user, {
            contacts: await this._getContacts(user.id),
            contactRequests: await this._getContactRequests(user.id)
        });
    };

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
