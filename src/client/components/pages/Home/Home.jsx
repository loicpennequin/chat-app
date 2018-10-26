import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import './Home.sass';
import RegisterForm from './RegisterForm/RegisterForm.jsx';
import UserModel from './../../../resources/models/UserModel.js';
import { Link } from 'react-router-dom';

const fetchData = params => ({});

export { fetchData };

@subscribe(store => ({}))
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerErrors: {},
            registerSuccess: false
        };
    }

    async register(values) {
        const response = await UserModel.create(values);
        if (response.error) {
            this.setState({ registerErrors: response.error });
        } else {
            this.setState({ registerSuccess: true });
        }
    }

    render() {
        const { registerErrors, registerSuccess } = this.state;
        return (
            <>
                {registerSuccess ? (
                    <p style={{ color: 'green' }}>
                        Registration successful. You can sign in{' '}
                        <Link to="/login">Here</Link>
                    </p>
                ) : (
                    <>
                        <RegisterForm
                            onSubmit={values => this.register(values)}
                            errors={registerErrors}
                        />
                        {registerErrors.error && (
                            <p className="text--danger">
                                Network Problem. Please try again.
                            </p>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default Home;
