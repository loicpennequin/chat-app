import api from './../services/RESTService.js';
import socket from './../services/ioService.js';

export default class AuthModel {
    static async login(body) {
        try {
            const response = await api.post('/login', body);
            socket.emit('user logged in', {
                id: localStorage.getItem('uid')
            });
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

    static async logout() {
        try {
            const response = await api.get('/logout');
            socket.emit('user logged out');
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}
