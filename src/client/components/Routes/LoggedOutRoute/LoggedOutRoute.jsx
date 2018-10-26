import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { subscribe } from 'react-contextual';
import Prefetcher from './../Prefetcher/Prefetcher.jsx';

const LoggedOutRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !rest.authenticated ? (
                <Prefetcher
                    {...props}
                    component={Component}
                    fetchFn={rest.fetchFn}
                />
            ) : (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default subscribe()(LoggedOutRoute);
