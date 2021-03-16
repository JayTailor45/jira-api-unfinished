const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        users: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const { registerInput: { email, password } } = args;
            const user = await User.findOne({ email });
            if (user) {
                throw new UserInputError('User is already exists', {
                    errors: {
                        email: 'This email is already taken'
                    }
                })
            }
            passowrd = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password, createdAt: new Date().toISOString() });
            const res = await user.save();
            return res;
        }
    }
}