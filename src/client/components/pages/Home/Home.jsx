import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm.jsx';
import UserModel from './../../../resources/models/UserModel.js';
import './Home.sass';

@subscribe(mapStateToProps)
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
        const successMessage = (
            <p style={{ color: 'green' }}>
                Registration successful. You can sign in
                <Link to="/login">Here</Link>
            </p>
        );

        return (
            <>
                {registerSuccess ? (
                    successMessage
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

function mapStateToProps(store) {
    return {
        users: store.users
    };
}

const homeFetch = async () => ({});

export { homeFetch };

export default Home;
