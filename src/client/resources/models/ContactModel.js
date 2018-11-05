import api from './../services/RESTService.js';

export default class UserModel {
    static async create(body) {
        try {
            return await api.post('/contacts', body);
        } catch (err) {
            return err;
        }
    }

    static async accept(id) {
        try {
            return await api.get(`/contacts/${id}/accept`);
        } catch (err) {
            return err;
        }
    }

    static async decline(id) {
        try {
            return await api.get(`/contacts/${id}/deny`);
        } catch (err) {
            return err;
        }
    }
}
