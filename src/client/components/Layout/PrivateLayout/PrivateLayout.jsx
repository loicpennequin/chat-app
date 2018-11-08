import React from 'react';
import PrivateNavbar from './PrivateNavbar/PrivateNavbar.jsx';
import ContactList from './../../contact/ContactList/ContactList.jsx';
import './PrivateLayout.sass';

const PrivateLayout = ({ children }) => (
    <div styleName="layout">
        <header style={{ gridArea: 'navbar' }}>
            <PrivateNavbar />
        </header>
        <ContactList />
        <main>{children}</main>
    </div>
);

export default PrivateLayout;
