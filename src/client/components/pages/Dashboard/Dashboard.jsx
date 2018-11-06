import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';
import { Link } from 'react-router-dom';
import './Dashboard.sass';

@subscribe(mapStateToProps)
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;
        return currentUser ? (
            <div styleName="dashboard">
                <h1 styleName="heading">Welcome back {currentUser?.username} !</h1>
                <h2 styleName="sub-heading">This is your dashboard.</h2>
                <Link to={`/profile/${currentUser.id}`}>Your profile</Link>
            </div>
        ) : (
            <div>Dashboard Loading...</div>
        );
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser
    };
}

const dashboardFetch = async params => ({
    currentUser: await UserModel.find(params.user_id)
});

export { dashboardFetch };

export default Dashboard;
