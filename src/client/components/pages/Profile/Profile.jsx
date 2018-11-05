import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import UserModel from './../../../resources/models/UserModel.js';
import ContactModel from './../../../resources/models/ContactModel.js';
import './Profile.sass';

@withRouter
@subscribe(mapStateToProps)
class Profile extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.id !== prevState.id) {
            return { id: nextProps.match.params.id };
        } else {
            return null;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isFriend:
                !this.props.isOwnProfile &&
                !this.props?.currentUser?.contacts.some(
                    c => c.id === this.props.profile.id
                )
        };

        this.sendContactRequest = this.sendContactRequest.bind(this);
    }

    async sendContactRequest() {
        const { currentUser, profile } = this.props;

        ContactModel.create({
            sender_id: currentUser.id,
            sendee_id: profile.id
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.id !== this.state.id) {
            this.props.setProfile(await UserModel.find(this.state.id));
            this.props.setIsOwnProfile(
                parseInt(this.props.match.params.id) ===
                    this.props.currentUser.id
            );
        }
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
        isOwnProfile: store.isOwnProfile,
        setProfile: store.setProfile,
        setIsOwnProfile: store.setIsOwnProfile
    };
}

const profileFetch = async params => ({
    currentUser: await UserModel.findSelf(),
    profile: await UserModel.find(params.url.id),
    isOwnProfile: params.url.id === params.user_id
});

export { profileFetch };

export default Profile;
