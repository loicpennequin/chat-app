import api from './../services/RESTService.js';

export default class UserModel {
    static async create(body) {
        try {
            return await api.post('/users', body);
        } catch (err) {
            return err;
        }
    }

    static async find(id) {
        try {
            return await api.get(`/users/${id}`);
        } catch (err) {
            return err;
        }
    }

    static async findAll(params) {
        try {
            return await api.get(`/users`, params);
        } catch (err) {
            return err;
        }
    }

    static async findSelf() {
        return await UserModel.find(localStorage.getItem('uid'));
    }
}
