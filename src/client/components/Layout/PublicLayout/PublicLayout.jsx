import React from 'react';
import PublicNavbar from './PublicNavbar/PublicNavbar.jsx';

const PublicLayout = ({children}) => (
    <>
        <PublicNavbar />
        {children}
    </>
);

export default PublicLayout;
