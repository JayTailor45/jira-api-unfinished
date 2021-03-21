const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../utils/validators');

function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, 'Secret', { expiresIn: '2h' });
}

module.exports = {
    Query: {
        users: async (_, args, context) => {
            const user = checkAuth(context);
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
            const { valid, errors } = validateRegisterInput(email, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (user) {
                throw new UserInputError('User is already exists', {
                    errors: {
                        email: 'This email is already taken'
                    }
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword, createdAt: new Date().toISOString() });
            const res = await newUser.save();
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
        login: async (parent, args, context, info) => {
            const { email, password } = args;
            const { valid, errors } = validateRegisterInput(email, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('Wrong credentials', { errors });
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    errors.general = 'User not found';
                    throw new UserInputError('Wrong credentials', { errors });
                }
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            };
        }
    }
}