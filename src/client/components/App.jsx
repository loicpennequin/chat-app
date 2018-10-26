import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-contextual';
import store from './../resources/store/store.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './../resources/services/i18NextService.js';
import { hot } from 'react-hot-loader';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
const Router = __IS_BROWSER__ ? BrowserRouter : StaticRouter;

class App extends Component {
    static propTypes = {
        routes: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const initialData = this.props.initialData
            ? this.props.initialData
            : window.__INITIAL_DATA__;

        const initialStore = {
            ...store,
            ...initialData,
            routes: this.props.routes
        };
        return (
            <Provider {...initialStore}>
                <I18nextProvider i18n={i18n}>
                    <Router location={this.props.location} context={{}}>
                        <Layout />
                    </Router>
                </I18nextProvider>
            </Provider>
        );
    }
}

export default hot(module)(App);
