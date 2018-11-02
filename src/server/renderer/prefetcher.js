const { User } = require('./../api').controllers;

module.exports = {
    home: async ({ params, user }) => ({}),
    login: async ({ params, user }) => ({}),
    dashboard: async ({ params, user }) => ({
        currentUser: (await User.findById(user)).data
    }),
    profile: async ({ params, user }) => ({
        currentUser: (await User.findById(user)).data,
        profile: (await User.findById(params.id)).data,
        isOwnProfile: user.id === parseInt(params.id, 10)
    })
};
