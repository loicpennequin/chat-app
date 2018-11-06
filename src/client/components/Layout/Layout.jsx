import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import socket from './../../resources/services/ioService.js';
import { init } from './../../resources/services/RESTService.js';
import UserModel from './../../resources/models/UserModel.js';
import AuthModel from './../../resources/models/AuthModel.js';
import PublicLayout from './PublicLayout/PublicLayout.jsx';
import PrivateLayout from './PrivateLayout/PrivateLayout.jsx';
import Routes from './../Routes/Routes.jsx';

@withRouter
@subscribe(mapStateToProps)
class Layout extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const navigated = nextProps.location.key !== prevState.location.key;

        return navigated
            ? Object.assign({}, prevState, {
                location: nextProps.location,
                needPrefetch: true
            })
            : null;
    }

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            needPrefetch: false
        };

        this.logout = this.logout.bind(this);
        this.updateUser = this.updateUser.bind(this);

        init({ unauthorized: this.logout });
    }

    componentDidMount() {
        if (this.props.authenticated) {
            socket.emit('user logged in', {
                id: this.props.currentUser.id
            });
        }
        socket.on('contact logged in', this.updateUser);
        socket.on('contact logged out', this.updateUser);
        socket.on('new contact request', this.updateUser);
        socket.on('contact request accepted', this.updateUser);
    }

    componentWillUnmount() {
        socket.off('contact logged in', this.updateUser);
        socket.off('contact logged off', this.updateUser);
        socket.off('new contact request', this.updateUser);
        socket.off('contact request accepted', this.updateUser);
    }

    async logout() {
        await this.props.logout();
        await AuthModel.logout();
    }

    async updateUser(data) {
        this.props.setCurrentUser(await UserModel.findSelf());
    }

    render() {
        const { authenticated, routes } = this.props;
        const { needPrefetch } = this.state;

        const DisplayedLayout = authenticated ? PrivateLayout : PublicLayout;
        const authLevel = authenticated ? 'private' : 'public';

        return (
            <DisplayedLayout>
                <Routes
                    needPrefetch={needPrefetch}
                    routes={routes.filter(
                        route => route.authLevel === authLevel
                    )}
                />
            </DisplayedLayout>
        );
    }
}

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated,
        logout: store.logout,
        currentUser: store.currentUser,
        routes: store.routes,
        setCurrentUser: store.setCurrentUser
    };
}

export default Layout;
