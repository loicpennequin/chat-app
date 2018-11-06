import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Notification.sass';

const Notification = ({ count, ...props }) => (
    <span className="fa-layers fa-fw" styleName="notification">
        <FontAwesomeIcon {...props} />
        {count > 0 && (
            <span className="fa-layers-counter" styleName="counter">
                {count}
            </span>
        )}
    </span>
);

export default Notification;
