import api from './../services/RESTService.js';

export default class AuthModel {
    static async login(body) {
        try {
            const response = await api.post('/login', body);
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async isLoggedIn() {
        try {
            return (await api.get('/isloggedin')).authenticated;
        } catch (err) {
            return false;
        }
    }

    static async logout(){
        try {
            const response = await api.get('/logout');
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}
