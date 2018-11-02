import React from 'react';
import moment from 'moment';
const ContactRequest = ({ request, onAccept, onDecline }) => {
    const date = moment(request.date).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    });

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
