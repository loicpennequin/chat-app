import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';
import './Dashboard.sass';

const fetchData = async params => {
    return ({currentUser: await UserModel.find(params.user_id)});
};

export { fetchData };

@subscribe(({ currentUser }) => ({ currentUser }))
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;
        return currentUser
            ? (
                <>
                    <h2>Hello {currentUser?.username} ! this is your dashboard.</h2>
                    <p>Here you will be able to :</p>
                    <ul>
                        <li><Link to="/latest">See the latest members,</Link></li>
                        <li><Link to={`/profile/${currentUser.id}`}>see and edit your profile,</Link></li>
                        <li>and configure the app to your likings</li>
                    </ul>
                </>
            ) : (
                <div>Dashboard Loading...</div>
            );
    }
}

export default Dashboard;
