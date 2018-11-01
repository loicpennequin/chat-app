const Contact = require('./contact.model.js');
const { ACCEPTED, DECLINED } = require('./../../enums/contactStatus.js');

const ContactController = function() {
    this.findAll = async queryParams => {
        logger.debug('ContactController | findAll');
        return {
            data: [...(await User.findAll(null, null, queryParams))]
        };
    };

    this.create = async data => {
        logger.debug('ContactController | create');
        return {
            data: {
                ...(await Contact.create(data))
            }
        };
    };

    this.accept = async id => {
        logger.debug('ContactController | accept');
        return {
            data: {
                ...(await Contact.update({ status: ACCEPTED }, { id }))
            }
        };
    };

    this.decline = async id => {
        logger.debug('ContactController | deny');
        return {
            data: {
                ...(await Contact.update({ status: DECLINED }, { id }))
            }
        };
    };
};

module.exports = new ContactController();
