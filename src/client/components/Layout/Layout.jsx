import React, { Component } from 'react';
import PublicLayout from './PublicLayout/PublicLayout.jsx';
import PrivateLayout from './PrivateLayout/PrivateLayout.jsx';
import { subscribe } from 'react-contextual';
import { init } from './../../resources/services/RESTService.js';
import AuthModel from './../../resources/models/AuthModel.js';

@subscribe(store => ({
    authenticated: store.authenticated,
    login: store.login,
    logout: store.logout
}))
class Layout extends Component {
    constructor(props) {
        super(props);
        init({
            unauthorized: this.props.logout
        });
    }

    async componentDidMount() {
        const loggedIn = await AuthModel.isLoggedIn();
        if (loggedIn) {
            this.props.login();
        }
    }

    render() {
        const { authenticated } = this.props;
        return authenticated ? (
            <PrivateLayout />
        ) : (
            <PublicLayout />
        );
    }
}

export default Layout;
