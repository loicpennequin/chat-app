import React, { Component } from 'react';
import { subscribe } from 'react-contextual';

const Contact = ({ contact }) => (
    <li>
        {contact.username} | {contact.email}
    </li>
);

@subscribe(mapStateToProps)
class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;

        const contacts = !currentUser?.contacts ? (
            <div>loading contact list...</div>
        ) : !currentUser.contacts.length > 0 ? (
            <div>You dont have any contact yet.</div>
        ) : (
            <ul>
                {currentUser.contacts.map(contact => (
                    <Contact key={contact.id} contact={contact} />
                ))}
            </ul>
        );

        return (
            <aside>
                <h3>contacts</h3>
                {contacts}
            </aside>
        );
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser
    };
}

export default ContactList;
