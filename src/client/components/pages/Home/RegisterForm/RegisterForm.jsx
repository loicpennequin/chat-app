import React, { Component } from 'react';
// import { Form, Text } from 'informed';
import Form from './../../../UI/PnwForm/PnwForm.jsx';

class RegisterForm extends Component {
    render() {
        const { onSubmit, errors } = this.props;
        const fields = [
            {
                id: 'register-username',
                type: 'text',
                label: 'Username',
                name: 'username'
            },
            {
                id: 'register-email',
                type: 'text',
                label: 'Email',
                name: 'email'
            },
            {
                id: 'register-password',
                type: 'password',
                label: 'Password',
                name: 'password'
            }
        ];
        return (
            <div>
                <h2>Register</h2>
                <Form onSubmit={onSubmit} errors={errors} fields={fields} />
            </div>
        );
    }
}

export default RegisterForm;
