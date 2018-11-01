import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import PublicLayout from './PublicLayout/PublicLayout.jsx';
import PrivateLayout from './PrivateLayout/PrivateLayout.jsx';
import { init } from './../../resources/services/RESTService.js';
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

        init({ unauthorized: this.props.logout });
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
        routes: store.routes
    };
}

export default Layout;
