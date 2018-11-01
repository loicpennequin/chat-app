const models = require('./../api').models;
const getUserContacts = require('./../utils/getUserContacts.js');

const getCurrentUser = async user =>
    Object.assign({}, await models.User.findById(user.id), {
        contacts: await getUserContacts(user.id)
    });

module.exports = {
    home: async ({ params, user }) => ({}),
    login: async ({ params, user }) => ({}),
    dashboard: async ({ params, user }) => ({
        currentUser: await getCurrentUser(user)
    }),
    profile: async ({ params, user }) => ({
        currentUser: await getCurrentUser(user),
        profile: await models.User.findById(params.id),
        isOwnProfile: user.id === parseInt(params.id, 10)
    })
};
