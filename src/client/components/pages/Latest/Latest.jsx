import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import UserModel from './../../../resources/models/UserModel.js';
import mapQueryString from './../../../resources/utils/mapQueryString.js';
import './Latest.sass';

const fetchData = async params => ({
    currentUser: await UserModel.find(params.user_id),
    latestUsers: await UserModel.findAll(mapQueryString({orderBy: ['created_at', 'DESC'], limit: 20}))
});

export { fetchData };

@subscribe(({latestUsers}) => ({latestUsers}))
class Latest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { latestUsers } = this.props;
        const usersList = this.props?.latestUsers?.map(user =>
            <div key={user.id} style={{margin: '5px'}}>
                <h4>{user.username}</h4>
                <p>{user.email}</p>
            </div>
        );
        return latestUsers ? (
            <div className="flex-rows">
                {usersList}
            </div>
        ) : (
            <div>Loading...</div>
        );
    }
}

export default Latest;
