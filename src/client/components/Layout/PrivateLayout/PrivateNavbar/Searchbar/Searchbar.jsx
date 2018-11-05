import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './../../../../UI/PnwForm/PnwForm.jsx';
import mapQueryString from './../../../../../resources/utils/mapQueryString.js';
import UserModel from './../../../../../resources/models/UserModel.js';

class Searchbar extends Component {
    state = {
        fields: [
            {
                id: 'searchbar-username',
                type: 'text',
                name: 'username',
                placeholder: 'search a user...',
                onChange: value => this.onChange(value)
            }
        ],
        results: undefined,
        showResults: false
    };

    onBlur() {
        this.setState({ showResults: false });
    }

    onFocus() {
        console.log('focus');
        this.setState({ showResults: true });
    }

    onSubmit(values) {
        console.log(values);
    }

    async onChange(value) {
        if (value?.length > 0) {
            const queryString = mapQueryString({
                filter: ['username', 'LIKE', `%${value}%`]
            });
            const results = await UserModel.findAll(queryString);
            this.setState({ results });
        } else {
            this.setState({ results: undefined });
        }
    }

    render() {
        const { fields, results, showResults } = this.state;
        const SubmitButton = () => <></>;
        const resultsList = results?.slice(0, 3).map(result => (
            <li key={'searchbarResult' + result.id}>
                <Link to={`/profile/${result.id}`}>{result.username}</Link>
            </li>
        ));

        return (
            <div className="flex-rows">
                <Form
                    autoComplete="off"
                    onSubmit={values => this.onSubmit(values)}
                    fields={fields}
                    SubmitButton={SubmitButton}
                    className="flex-columns"
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                />
                {showResults &&
                    results?.length > 0 && (
                    <ul>
                        {resultsList}
                        {results.length > 3 && (
                            <li>See all {results.length} results</li>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default Searchbar;
