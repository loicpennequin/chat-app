import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';
import './Profile.sass';

const fetchData = async params => {
    return ({
        currentUser: await UserModel.find(params.user_id),
        profile: await UserModel.find(params.url.id),
        isOwnProfile: params.url.id === params.user_id
    });
};

export { fetchData };

@subscribe( ({profile, isOwnProfile}) => ({profile, isOwnProfile}) )
class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { profile, isOwnProfile } = this.props;
        return profile ? (
            <>
                <p>This is {profile.username}&apos;s profile.</p>
                {isOwnProfile && <button>edit</button>}
            </>
        ) : (
            <div>Loading...</div>
        );
    }
}

export default Profile;
