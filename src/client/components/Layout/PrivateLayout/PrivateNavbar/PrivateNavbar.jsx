import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthModel from './../../../../resources/models/AuthModel.js';
import ContactRequestList from './../../../contact/ContactRequestList/ContactRequestList.jsx';
import Searchbar from './Searchbar/Searchbar.jsx';
import ClickOutside from './../../../UI/ClickOutside/ClickOutside.jsx';
import Notification from './../../../UI/Notification/Notification.js';
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

    async toggleRequests() {
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
                <div styleName="navbar_inner">
                    <Link to="/dashboard" styleName="navbar_icon">
                        <FontAwesomeIcon icon="home" />
                    </Link>
                    <Searchbar />
                    <div styleName="action-bar">
                        <FontAwesomeIcon icon="comment" styleName="navbar_icon"/>
                        <div styleName="contact-list_wrapper">
                            <Notification
                                styleName="navbar_icon"
                                icon="user"
                                onClick={this.toggleRequests}
                                count={requests?.length}
                            />
                            {showRequests && (
                                <div styleName="contact-list">
                                    <ClickOutside
                                        component={ContactRequestList}
                                        onClickOutside={this.toggleRequests}
                                        onNavigate={this.toggleRequests}
                                    />
                                </div>
                            )}
                        </div>
                        <Link to="/" onClick={this.logout} styleName="navbar_icon">
                            <FontAwesomeIcon icon="sign-out-alt" />
                        </Link>
                    </div>
                </div>
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
