import React, { Component } from 'react';
// import { Form, Text } from 'informed';
import Form from './../../../UI/PnwForm/PnwForm.jsx';

class LoginForm extends Component {
    render() {
        const { onSubmit, errors } = this.props;
        const fields = [
            {
                id: 'login-username',
                type: 'text',
                label: 'Username',
                name: 'username'
            },
            {
                id: 'login-password',
                type: 'password',
                label: 'Password',
                name: 'password'
            }
        ];
        return (
            <div>
                <h2>Login</h2>
                <Form onSubmit={onSubmit} errors={errors} fields={fields} />
            </div>
        );
    }
}

export default LoginForm;
