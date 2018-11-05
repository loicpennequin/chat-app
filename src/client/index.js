import React from 'react';
import { hydrate } from 'react-dom';
import { hot } from 'react-hot-loader';
import './resources/services/ioService.js';
import App from './components/App.jsx';
import routes from './resources/services/routesService.js';
import './styles/app.sass';
import './resources/services/iconService.js';

if (!__IS_BROWSER__) {
    require('source-map-support').install();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        hydrate(<App routes={routes} />, document.getElementById('app'));
    });
}

const SSREntry = hot(module)(App);

export { routes, SSREntry };
