import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import AuthModel from './../../../../resources/models/AuthModel.js';
import './PrivateNavbar.sass';

@subscribe(store => ({ logout: store.logout }))
class PrivateNavbar extends Component {
    constructor(props){
        super(props);
    }

    async logout(){
        AuthModel.logout();
        this.props.logout();
    }

    render() {
        return (
            <nav styleName="navbar">
                <Link to="/dashboard">Home</Link>
                <a href="/" onClick={() => this.logout()}>Logout</a>
            </nav>
        );
    }
}

export default PrivateNavbar;
