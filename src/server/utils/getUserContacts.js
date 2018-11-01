const contactStatus = require('./../enums/contactStatus.js');

module.exports = async id =>
    (await require('./../api')
        .models.Contact._model.forge()
        .query({
            where: { sender_id: id },
            orWhere: { sendee_id: id },
            andWhere: { status: contactStatus.ACCEPTED }
        })
        .fetchAll({ withRelated: ['sendee', 'sender'] }))
        .toJSON()
        .map(
            contact =>
                contact.sender_id === id ? contact.sendee : contact.sender
        );
