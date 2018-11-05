import React, { Component } from 'react';

class MessageSender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    onChange(e) {
        const message = e.target.value;
        this.setState({ message });
    }

    async onSubmit(e) {
        e.preventDefault();
        await this.props.onSubmit(this.state.message);
        this.setState({ message: '' });
    }
    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <input
                    type="text"
                    value={this.state.message}
                    onChange={e => this.onChange(e)}
                />
                <input type="submit" value="send" />
            </form>
        );
    }
}

export default MessageSender;
