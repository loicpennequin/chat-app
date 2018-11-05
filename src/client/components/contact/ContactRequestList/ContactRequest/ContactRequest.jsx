import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from './../../../../resources/utils/formatDate.js';
import Avatar from './../../../UI/Avatar/Avatar.jsx';
import './contactRequest.sass';

const ContactRequest = ({ request, onAccept, onDecline }) => {
    const date = formatDate(request.date);

    return (
        <li styleName="wrapper">
            <Link to={`/profile/${request.id}`} styleName="infos">
                <Avatar user={request} size="md"/>
                <div styleName="infos_text">
                    <div styleName="username">{request.username}</div>
                    <div styleName="date">{date}</div>
                </div>
            </Link>

            <div className="flex-columns">
                <button onClick={() => onAccept(request.request_id)} className="text--success button button--clear">
                    <FontAwesomeIcon icon="check" fixedWidth size="lg" />
                </button>
                <button onClick={() => onDecline(request.request_id)} className="text--danger button button--clear">
                    <FontAwesomeIcon icon="times" fixedWidth size="lg" />
                </button>
            </div>
        </li>
    );
};

export default ContactRequest;
