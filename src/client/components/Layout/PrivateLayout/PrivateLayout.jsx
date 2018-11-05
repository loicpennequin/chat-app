import React from 'react';
import PrivateNavbar from './PrivateNavbar/PrivateNavbar.jsx';
import ContactList from './ContactList/ContactList.jsx';
import './PrivateLAyout.sass';

const PrivateLayout = ({ children }) => (
    <div styleName="layout">
        <PrivateNavbar />
        <ContactList />
        <main>{children}</main>
    </div>
);

export default PrivateLayout;
