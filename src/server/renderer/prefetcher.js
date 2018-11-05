const { User, Message } = require('./../api').controllers;

module.exports = {
    home: async ({ params, user }) => ({}),
    login: async ({ params, user }) => ({}),
    dashboard: async ({ params, user }) => ({
        currentUser: (await User.findById(user.id)).data
    }),
    profile: async ({ params, user }) => ({
        currentUser: (await User.findById(user.id)).data,
        profile: (await User.findById(params.id)).data,
        isOwnProfile: user.id === parseInt(params.id, 10)
    }),
    conversation: async ({ params, user }) => ({
        currentUser: (await User.findById(user.id)).data,
        messages: (await Message.findByUser(user.id, params.id)).data
    })
};
