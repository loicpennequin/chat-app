import React from 'react';
import formatDate from './../../../../resources/utils/formatDate.js';

const ContactRequest = ({ request, onAccept, onDecline }) => {
    const date = formatDate(reques.date);

    return (
        <li>
            <div>
                {request.username} | {date}
            </div>
            <div>
                <button onClick={() => onAccept(request.request_id)}>
                    accept
                </button>
                <button onClick={() => onDecline(request.request_id)}>
                    decline
                </button>
            </div>
        </li>
    );
};

export default ContactRequest;
