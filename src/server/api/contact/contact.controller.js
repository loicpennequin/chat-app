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
        const contact = await Contact.create(data);
        const { contactRequestEvents } = require('./../../websockets');
        contactRequestEvents.newRequest(contact.sendee_id);
        return {
            data: {
                ...contact
            }
        };
    };

    this.accept = async id => {
        logger.debug('ContactController | accept');
        const { contactRequestEvents } = require('./../../websockets');
        const contact = await Contact.update({ status: ACCEPTED }, { id });
        contactRequestEvents.acceptRequest(contact.sender_id);
        return {
            data: {
                ...contact
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
