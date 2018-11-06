import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardActionCard.sass';

const DashboardActionCard = ({ icon, text, action }) => (
    <button styleName="action-card" onClick={() => action()}>
        <FontAwesomeIcon icon={icon} size="4x" fixedWidth styleName="icon" />
        <div styleName="text">{text}</div>
    </button>
);

export default DashboardActionCard;
