import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactListLoader from './../../Loader/PageLoader.jsx';
import Avatar from './../../UI/Avatar/Avatar.jsx';
import './ContactList.sass';

const Contact = ({ contact }) => (
    <li styleName="contact">
        <div styleName="contact_avatar">
            <Avatar user={contact} size="md" />
        </div>
        <Link to={`/messages/${contact.id}`}>{contact.username}</Link>
        <Link to={`/profile/${contact.id}`} styleName="contact_profile-link">
            <FontAwesomeIcon icon={['far', 'address-card']} size="lg" />
        </Link>
    </li>
);

const ContactSection = ({ contacts, type, show }) => (
    <div styleName="list_wrapper">
        <ul styleName="list">
            {show && contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ))}
            {contacts.length === 0 && <li styleName="no-contact">No {type} contact.</li>}
        </ul>
    </div>
);

@subscribe(mapStateToProps)
class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOnline: true,
            showOffline: true
        };
    }

    toggleOffline() {
        this.setState(state => ({ showOffline: !state.showOffline }));
    }

    toggleOnline() {
        this.setState(state => ({ showOnline: !state.showOnline }));
    }

    render() {
        const { currentUser } = this.props;
        const { showOnline, showOffline } = this.state;

        const onlineContacts = currentUser?.contacts?.filter(
            c => c.is_online === 1
        );
        const offlineContacts = currentUser?.contacts?.filter(
            c => c.is_online === 0
        );

        const onlineList = <ContactSection contacts={onlineContacts} type="online" show={showOnline}/>;
        const offlineList = <ContactSection contacts={offlineContacts} type="offline" show={showOffline}/>;

        const contacts = !currentUser?.contacts ? (
            <ContactListLoader />
        ) : !currentUser.contacts.length > 0 ? (
            <div>You dont have any contact yet.</div>
        ) : (
            <div styleName="contact_fixed-wrapper">
                <h3 styleName="section_title">
                    Online({onlineContacts.length})
                    <span styleName="section_title_toggle">
                        <FontAwesomeIcon
                            icon={!showOnline ? 'chevron-right' : 'chevron-down'}
                            onClick={() => this.toggleOnline()}
                            size="sm"
                        />
                    </span>
                </h3>
                {onlineList}
                <h3 styleName="section_title">
                    Offline({offlineContacts.length})
                    <span styleName="section_title_toggle">
                        <FontAwesomeIcon
                            icon={
                                !showOffline ? 'chevron-right' : 'chevron-down'
                            }
                            onClick={() => this.toggleOffline()}
                            size="sm"
                        />
                    </span>
                </h3>
                {offlineList}
            </div>
        );

        return <aside styleName="contact-list">{contacts}</aside>;
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser
    };
}
export default ContactList;
