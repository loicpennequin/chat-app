import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import UserModel from './../../../resources/models/UserModel.js';
import MessageModel from './../../../resources/models/MessageModel.js';
import formatTime from './../../../resources/utils/formatTime.js';
import MessageSender from './MessageSender/MessageSender.jsx';
import socket from './../../../resources/services/ioService.js';
import Avatar from './../../UI/Avatar/Avatar.jsx';
import './Conversation.sass';

@withRouter
@subscribe(mapStateToProps)
class Conversation extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.id !== prevState.id) {
            return { id: nextProps.match.params.id };
        } else {
            return null;
        }
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.scrollEnd = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.updateMessages = this.updateMessages.bind(this);
    }
    componentDidMount() {
        socket.on('new message', () => {
            this.updateMessages();
        });
        setTimeout(this.scrollToBottom, 500);

    }

    componentWillUnMount() {
        socket.off('new message', this.updateMessages);
    }

    async updateMessages() {
        await this.props.setMessages(
            await MessageModel.findByUser(this.props.match.params.id)
        );
        this.scrollToBottom();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.id !== this.state.id) {
            this.props.setMessages(
                await MessageModel.findByUser(this.state.id)
            );
        }
    }

    async onSubmit(message) {
        await MessageModel.create({
            sender_id: this.props.currentUser.id,
            sendee_id: this.props.match.params.id,
            content: message
        });
        this.updateMessages();
    }

    scrollToBottom() {
        this.scrollEnd.current.scrollIntoView({ behavior: 'instant' });
    }

    render() {
        const displayAvatar = (message, i) =>
            this.props?.messages[i + 1]?.sender?.id !== message.sender.id;
        const messages = this.props?.messages;
        return (
            <>
                <ul styleName="wrapper" className="container">
                    {messages?.map((message, i) => {
                        const isSelf =
                            message.sender.id === this.props.currentUser.id;

                        return (
                            <li
                                styleName={`message ${isSelf ? 'self' : ''}`}
                                key={message.id}
                                ref={i === messages.length -1 ? this.scrollEnd : null}
                            >
                                <div
                                    styleName="message_avatar"
                                    style={{
                                        opacity: displayAvatar(message, i)
                                            ? 1
                                            : 0
                                    }}
                                >
                                    <Avatar user={message.sender} size="lg" />
                                </div>

                                <div>
                                    <div styleName="message_content">
                                        {message.content}
                                    </div>
                                    <div styleName="message_date">
                                        {formatTime(message.created_at)}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <MessageSender onSubmit={message => this.onSubmit(message)} />
            </>
        );
    }
}

function mapStateToProps(store) {
    return {
        currentUser: store.currentUser,
        messages: store.messages,
        setMessages: store.setMessages
    };
}

const conversationFetch = async params => ({
    currentUser: await UserModel.findSelf(),
    messages: await MessageModel.findByUser(params.url.id)
});

export { conversationFetch };
export default Conversation;
