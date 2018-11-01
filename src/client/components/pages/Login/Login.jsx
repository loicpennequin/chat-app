import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import LoginForm from './LoginForm/LoginForm.jsx';
import AuthModel from './../../../resources/models/AuthModel.js';

@subscribe(mapStateToProps)
class Login extends Component {
    state = {};

    async login(values) {
        const { error } = await AuthModel.login(values);
        if (error) {
            this.setState({ loginError: error });
        } else {
            this.props.login();
        }
    }

    render() {
        const { loginError } = this.state;
        return (
            <>
                <LoginForm
                    onSubmit={values => this.login(values)}
                    errors={loginError}
                />
                {loginError && <p className="text--danger">{loginError}</p>}
            </>
        );
    }
}

function mapStateToProps(store) {
    return {
        login: store.login,
        setCurrentUser: store.setCurrentUser
    };
}

const loginFetch = async () => ({});

export { loginFetch };

export default Login;
