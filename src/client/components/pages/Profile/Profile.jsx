import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';
import ContactModel from './../../../resources/models/ContactModel.js';
import './Profile.sass';

@subscribe(mapStateToProps)
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFriend: !this.props.currentUser.contacts.some(
                c => c.id === profile.id
            )
        };

        this.sendContactRequest = this.sendContactRequest.bind(this);
    }

    async sendContactRequest() {
        const { currentUser, profile } = this.props;

        const req = await ContactModel.create({
            sender_id: currentUser.id,
            sendee_id: profile.id
        });

        console.log(req);
    }

    render() {
        const { profile, isOwnProfile } = this.props;
        const { isFriend } = this.state;

        return profile ? (
            <>
                <p>This is {profile.username}&apos;s profile.</p>
                {isOwnProfile && <button>edit</button>}
                {isFriend && (
                    <button onClick={this.sendContactRequest}>
                        add friend
                    </button>
                )}
            </>
        ) : (
            <div>Loading...</div>
        );
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser,
        profile: store.profile,
        isOwnProfile: store.isOwnProfile
    };
}

const profileFetch = async params => ({
    currentUser: await UserModel.find(params.user_id),
    profile: await UserModel.find(params.url.id),
    isOwnProfile: params.url.id === params.user_id
});

export { profileFetch };

export default Profile;
