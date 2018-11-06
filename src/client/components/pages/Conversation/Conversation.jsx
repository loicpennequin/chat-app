import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import UserModel from './../../../resources/models/UserModel.js';
import MessageModel from './../../../resources/models/MessageModel.js';
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

        this.updateMessages = this.updateMessages.bind(this);
    }
    componentDidMount() {
        socket.on('new message', () => {
            this.updateMessages();
        });
    }

    componentWillUnMount() {
        socket.off('new message', this.updateMessages);
    }

    async updateMessages() {
        this.props.setMessages(
            await MessageModel.findByUser(this.props.match.params.id)
        );
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

    render() {
        return (
            <ul styleName="wrapper" className="container">
                {this.props?.messages?.map(message => {
                    const isSelf =
                        message.sender.id === this.props.currentUser.id;
                    return (
                        <li
                            styleName={`message ${isSelf ? 'self' : ''}`}
                            key={message.id}
                        >
                            <Avatar user={message.sender} size="lg" />
                            <div styleName="message_content">
                                {message.content}
                            </div>
                        </li>
                    );
                })}
                <MessageSender onSubmit={message => this.onSubmit(message)} />
            </ul>
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
