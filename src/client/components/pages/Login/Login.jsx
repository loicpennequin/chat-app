import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import LoginForm from './LoginForm/LoginForm.jsx';
import AuthModel from './../../../resources/models/AuthModel.js';
import './Login.sass';

const fetchData = params => ({});

export { fetchData };

@subscribe(({ login, setUser }) => ({ login, setUser }))
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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

export default Login;
