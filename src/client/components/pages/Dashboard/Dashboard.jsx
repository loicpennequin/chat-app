import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';

@subscribe(mapStateToProps)
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;
        return currentUser ? (
            <>
                <h1>Hello {currentUser?.username} ! this is your dashboard.</h1>
            </>
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
