import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from './../../Loader/PageLoader.jsx';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';

@subscribe(store => ({ setState: store.setState }))
class Prefetcher extends Component {
    static propTypes = {
        setState: PropTypes.func.isRequired,
        fetchFn: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        component: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            fetching: __IS_BROWSER__ && !window.__INITIAL_DATA__
        };
    }

    componentDidMount() {
        this.fetchInitialData();
        delete window.__INITIAL_DATA;
    }

    async fetchInitialData() {
        if (__IS_BROWSER__) {
            const data = await this.props.fetchFn({ url: this.props.match.params, user_id : localStorage.getItem('uid')});
            await this.props.setState(data);
        }
        this.setState({
            fetching: false
        });
    }

    render() {
        const { component: Component } = this.props;
        const { fetching } = this.state;
        return fetching ? <Loader /> : <Component />;
    }
}

export default withRouter(Prefetcher);
