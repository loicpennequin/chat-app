import React, { Component } from 'react';

class ClickOutside extends Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e) {
        console.log('click');
        if (this?.node?.current?.contains(e.target)) {
            return;
        }
        console.log('click outside');
        this.props.onClickOutside();
    }

    render() {
        const { component: Component, ...props } = this.props;
        return <Component domRef={this.node} {...props} />;
    }
}

export default ClickOutside;
