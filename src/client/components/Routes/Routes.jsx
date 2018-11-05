import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import LoggedOutRoute from './LoggedOutRoute/LoggedOutRoute.jsx';

@subscribe(mapStateToProps)
class Routes extends Component {
    render() {
        const { authenticated, routes, needPrefetch } = this.props;

        const generateRoute = route =>
            route.authLevel === 'public' ? LoggedOutRoute : PrivateRoute;

        return (
            <Switch>
                {routes.map(({ component: Component, ...route }) => {
                    const GeneratedRoute = generateRoute(route);
                    return (
                        <GeneratedRoute
                            key={'route-' + route.path}
                            component={Component}
                            {...route}
                            needPrefetch={needPrefetch}
                        />
                    );
                })}
                <Redirect to={authenticated ? '/dashboard' : '/'} />
            </Switch>
        );
    }
}

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

export default Routes;
