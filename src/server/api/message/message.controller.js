const Message = require('./message.model.js');

const ContactController = function() {
    this.findByUser = async (userId, id) => {
        logger.debug('ContactController | findAll');
        const messages = (await Message._model
            .forge()
            .query(qb => {
                qb.where(function() {
                    this.where('sendee_id', id).andWhere('sender_id', userId);
                }).orWhere(function() {
                    this.where('sender_id', id).andWhere('sendee_id', userId);
                });
            })
            .fetchAll({ withRelated: ['sender', 'sendee'] })).toJSON();

        return {
            data: [...messages]
        };
    };

    this.create = async data => {
        logger.debug('MessageController | create');
        const messages = await Message.create(data);
        const { messageEvents } = require('./../../websockets');
        messageEvents.newMessage(data.sendee_id);
        return {
            data: {
                ...messages
            }
        };
    };
};

module.exports = new ContactController();
