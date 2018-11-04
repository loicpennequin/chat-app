import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import AuthModel from './../../../../resources/models/AuthModel.js';
import ContactRequestList from './../../../contact/ContactRequestList/ContactRequestList.jsx';
import './PrivateNavbar.sass';

@subscribe(mapStateToProps)
class PrivateNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRequests: false
        };

        this.toggleRequests = this.toggleRequests.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggleRequests() {
        this.setState(state => ({ showRequests: !state.showRequests }));
    }

    async logout() {
        AuthModel.logout();
        this.props.logout();
    }

    render() {
        const requests = this.props?.currentUser?.contactRequests?.recieved;
        const { showRequests } = this.state;

        return (
            <nav styleName="navbar">
                <Link to="/dashboard">Home</Link>
                <Link to="/" onClick={this.logout}>
                    Logout
                </Link>
                {requests?.length > 0 && (
                    <>
                        <button onClick={this.toggleRequests}>
                            {requests?.length} new contact requests
                        </button>
                        {showRequests ? <ContactRequestList /> : null}
                    </>
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
