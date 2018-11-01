import api from './../services/RESTService.js';

export default class UserModel {
    static async getUserContacts(id) {
        try {
            const contacts = await api.get(`/users/${id}/contacts`);
            return contacts;
        } catch (err) {
            return err;
        }
    }
}
