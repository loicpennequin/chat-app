import React, { Component } from 'react';
import PageLoader from './../../loaders/PageLoader.jsx';
import { subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';

@withRouter
@subscribe(mapStateToProps)
class Prefetcher extends Component {
    state = {
        fetching: __IS_BROWSER__ && !window.__INITIAL_DATA__
    };

    componentDidMount() {
        this.fetchInitialData();
        delete window.__INITIAL_DATA;
    }

    async fetchInitialData() {
        if (__IS_BROWSER__ && this.props.needPrefetch) {
            const data = await this.props.fetchFn({
                url: this.props.match.params,
                user_id: localStorage.getItem('uid')
            });
            await this.props.setState(data);
        }
        this.setState({
            fetching: false
        });
    }

    render() {
        const { component: Component } = this.props;
        const { fetching } = this.state;
        return fetching ? <PageLoader /> : <Component />;
    }
}

function mapStateToProps(store) {
    return {
        setState: store.setState
    };
}

export default Prefetcher;
