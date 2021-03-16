const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: String
    },
});

module.exports = model('User', userSchema);