import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import ContactModel from './../../../resources/models/ContactModel.js';
import UserModel from './../../../resources/models/UserModel.js';
import ContactRequest from './ContactRequest/ContactRequest.jsx';

@subscribe(mapStateToProps)
class ContactRequestList extends Component {
    constructor(props) {
        super(props);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }

    async accept(requestId) {
        await ContactModel.accept(requestId);
        this.props.setCurrentUser(await UserModel.findSelf());
    }

    async decline(requestId) {
        await ContactModel.decline(requestId);
        this.props.setCurrentUser(await UserModel.findSelf());
    }

    render() {
        const { recieved } = this.props?.currentUser?.contactRequests;
        return (
            <ul ref={this.props.domRef}>
                {recieved?.map(request => (
                    <ContactRequest
                        key={request.id}
                        request={request}
                        onAccept={this.accept}
                        onDecline={this.decline}
                        onNavigate={() => this.props.onNavigate()}
                    />
                ))}
            </ul>
        );
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser,
        setCurrentUser: store.setCurrentUser
    };
}

export default ContactRequestList;
