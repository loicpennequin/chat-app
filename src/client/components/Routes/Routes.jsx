import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import LoggedOutRoute from './LoggedOutRoute/LoggedOutRoute.jsx';

@subscribe(store => ({ authenticated: store.authenticated }))
class Routes extends Component {
    static propTypes = {
        routes: PropTypes.arrayOf(PropTypes.object).isRequired
    };
    render() {
        const { authenticated } = this.props;
        return (
            <Switch>
                {this.props.routes.map(({ component: Component, ...route }) => {
                    const GeneratedRoute =
                        route.authLevel === 'public'
                            ? LoggedOutRoute
                            : PrivateRoute;
                    return (
                        <GeneratedRoute
                            key={'route-' + route.path}
                            component={Component}
                            {...route}
                        />
                    );
                })}
                <Redirect to={authenticated ? '/dashboard' : '/'} />
            </Switch>
        );
    }
}

export default Routes;
