import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import Routes from './../../Routes/Routes.jsx';
import PrivateNavbar from './PrivateNavbar/PrivateNavbar.jsx';
import ContactList from './ContactList/ContactList.jsx';
import './PrivateLayout.sass';

@subscribe(store => ({
    routes: store.routes
}))
class PrivateLayout extends Component {
    render() {
        return (
            <div styleName="layout">
                <PrivateNavbar />
                <ContactList />
                <main>
                    <Routes
                        routes={this.props.routes.filter(
                            route => route.authLevel === 'private'
                        )}
                    />
                </main>
            </div>
        );
    }
}
export default PrivateLayout;
