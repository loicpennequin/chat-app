import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import ContactListLoader from './../../../loaders/ContactListLoader.jsx';

const Contact = ({ contact }) => (
    <li>
        {contact.username} | {contact.email}
        <Link to={`/profile/${contact.id}`}>See profile</Link>
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
            <ContactListLoader />
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
