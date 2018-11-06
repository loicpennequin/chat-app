import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './../../../../UI/PnwForm/PnwForm.jsx';
import mapQueryString from './../../../../../resources/utils/mapQueryString.js';
import UserModel from './../../../../../resources/models/UserModel.js';
import css from './Searchbar.sass';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    id: 'searchbar-username',
                    type: 'text',
                    name: 'username',
                    placeholder: 'search a user...',
                    onChange: value => this.onChange(value),
                    className: css.input
                }
            ],
            results: undefined,
            showResults: false
        };

        this.node = React.createRef();
        this.hideResults = this.hideResults.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.hideResults);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideResults);
    }

    hideResults(e) {
        if (this?.node?.current?.contains(e.target)) {
            return;
        }

        this.setState({ showResults: false });
    }

    onFocus() {
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
            <li key={'searchbarResult' + result.id} styleName="result">
                <Link to={`/profile/${result.id}`}>{result.username}</Link>
            </li>
        ));

        return (
            <div className="flex-rows" ref={this.node} styleName="searchbar">
                <Form
                    autoComplete="off"
                    onSubmit={values => this.onSubmit(values)}
                    fields={fields}
                    SubmitButton={SubmitButton}
                    styleName="searchbar"
                    className="flex-columns"
                    onFocus={() => this.onFocus()}
                />
                {showResults &&
                    results?.length > 0 && (
                    <ul styleName="results_wrapper">
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
