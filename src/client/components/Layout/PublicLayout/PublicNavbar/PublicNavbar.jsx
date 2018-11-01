import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Sign in</Link>
        </nav>
    );
};

export default PublicNavbar;
