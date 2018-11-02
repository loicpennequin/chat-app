import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import AuthModel from './../../../../resources/models/AuthModel.js';
import './PrivateNavbar.sass';

@subscribe(mapStateToProps)
class PrivateNavbar extends Component {
    constructor(props) {
        super(props);
    }

    async logout() {
        AuthModel.logout();
        this.props.logout();
    }

    render() {
        const requests = this.props?.currentUser?.contactRequests?.recieved;

        return (
            <nav styleName="navbar">
                <Link to="/dashboard">Home</Link>
                <a href="/" onClick={() => this.logout()}>
                    Logout
                </a>
                {requests?.length > 0 && (
                    <button>{requests?.length} new contact requests</button>
                )}
            </nav>
        );
    }
}

function mapStateToProps(store) {
    return {
        logout: store.logout,
        currentUser: store.currentUser
    };
}

export default PrivateNavbar;
