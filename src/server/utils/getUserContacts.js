const contactStatus = require('./../enums/contactStatus.js');
// can't require models outside of the exported function otherwise it returnes {}. Circular dependency issue ?
module.exports = async id =>
    (await require('./../api')
        .models.Contact._model.forge()
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
