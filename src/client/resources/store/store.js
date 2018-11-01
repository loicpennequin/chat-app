import routes from './../services/routesService.js';

const store ={
    routes,
    authenticated: false,
    login: () => state => ({ authenticated: true }),
    logout: () => state => {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        return { authenticated: false };
    },
    setCurrentUser: currentUser => state => ({ currentUser })
};

export default store;
