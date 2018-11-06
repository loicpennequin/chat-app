import React from 'react';
import PrivateNavbar from './PrivateNavbar/PrivateNavbar.jsx';
import ContactList from './../../contact/ContactList/ContactList.jsx';
import './PrivateLayout.sass';

const PrivateLayout = ({ children }) => (
    <div styleName="layout">
        <div style={{ gridArea: 'navbar' }}>
            <PrivateNavbar />
        </div>
        <ContactList />
        <main>{children}</main>
    </div>
);

export default PrivateLayout;
