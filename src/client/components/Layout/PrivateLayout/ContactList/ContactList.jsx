import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import ContactListLoader from './../../../loaders/ContactListLoader.jsx';

const Contact = ({ contact }) => (
    <li>
        <Link to={`/messages/${contact.id}`}>{contact.username}|</Link>
        <Link to={`/profile/${contact.id}`}>See profile</Link>
    </li>
);

const ContactSection = ({ contacts }) => (
    <ul>
        {contacts.map(contact => (
            <Contact key={contact.id} contact={contact} />
        ))}
    </ul>
);

@subscribe(mapStateToProps)
class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;

        const onlineContacts = currentUser?.contacts?.filter(
            c => c.is_online === 1
        );
        const offlineContacts = currentUser?.contacts?.filter(
            c => c.is_online === 0
        );

        const onlineList = <ContactSection contacts={onlineContacts} />;
        const offlineList = <ContactSection contacts={offlineContacts} />;

        const contacts = !currentUser?.contacts ? (
            <ContactListLoader />
        ) : !currentUser.contacts.length > 0 ? (
            <div>You dont have any contact yet.</div>
        ) : (
            <>
                <h3>Online({onlineContacts.length})</h3>
                {onlineList}
                <h3>Offline({offlineContacts.length})</h3>
                {offlineList}
            </>
        );

        return (
            <aside>
                <h2>contacts</h2>
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
