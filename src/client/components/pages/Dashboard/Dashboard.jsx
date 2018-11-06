import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import UserModel from './../../../resources/models/UserModel.js';
import DashboardActionCard from './DashboardActionCard/DashboardActionCard.jsx';
import './Dashboard.sass';

@withRouter
@subscribe(mapStateToProps)
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.navigateToProfile = this.navigateToProfile.bind(this);
        this.navigateToLatest = this.navigateToLatest.bind(this);
        this.openSettings = this.openSettings.bind(this);
    }

    navigateToProfile() {
        this.props.history.push(`/profile/${localStorage.getItem('uid')}`);
    }

    navigateToLatest() {
        alert('WIP');
    }

    openSettings() {
        alert('WIP');
    }

    render() {
        const { currentUser } = this.props;
        return currentUser ? (
            <div styleName="dashboard">
                <h1 styleName="heading">
                    Welcome back {currentUser?.username} !
                </h1>
                <h2 styleName="sub-heading">This is your dashboard.</h2>
                <div className="flex-columns">
                    <DashboardActionCard
                        icon="chalkboard-teacher"
                        text="Your Profile"
                        action={this.navigateToProfile}
                    />
                    <DashboardActionCard
                        icon="users"
                        text="New members"
                        action={this.navigateToLatest}
                    />
                    <DashboardActionCard
                        icon="cogs"
                        text="Settings"
                        action={this.openSettings}
                    />
                </div>
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
