import api from './../services/RESTService.js';

export default class MessageModel {
    static async create(body) {
        try {
            return await api.post('/messages', body);
        } catch (err) {
            return err;
        }
    }

    static async findByUser(id) {
        try {
            return await api.get(`/messages/${id}`);
        } catch (err) {
            return err;
        }
    }
}
