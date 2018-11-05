import React from 'react';
import './Avatar.sass';

const Avatar = ({user, size}) => {
    const sizeMappings = {
        sm: '20px',
        md: '40px',
        lg: '60px',
        xl: '120px'
    };
    return (
        <div styleName="avatar" style={{'--size': sizeMappings[size]}}>{user.username.slice(0,1).toUpperCase()}</div>
    );
};

export default Avatar;
