const User = require('./user.model.js');
const getUserContacts = require('./../../utils/getUserContacts.js');

const UserController = function() {
    this.findAll = async queryParams => {
        logger.debug('UserController | findAll');
        return {
            data: [...(await User.findAll(null, null, queryParams))]
        };
    };

    this.findById = async (id, queryParams) => {
        logger.debug('UserController | findbyId');
        const user = await User.findById(id, queryParams);

        return {
            data: {
                ...Object.assign(user, {
                    contacts: await getUserContacts(user.id)
                })
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
