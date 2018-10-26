import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import Routes from './../../Routes/Routes.jsx';
import PublicNavbar from './PublicNavbar/PublicNavbar.jsx';

@subscribe(store => ({
    routes: store.routes
}))
class PublicLayout extends Component {
    render() {
        return (
            <>
                <PublicNavbar />
                <Routes
                    routes={this.props.routes.filter(
                        route => route.authLevel === 'public'
                    )}
                />
            </>
        );
    }
}

export default PublicLayout;
