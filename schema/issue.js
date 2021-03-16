const { Schema, model } = require('mongoose');

const issueSchema = new Schema({
    title: {
        type: String
    },
    ticketKey: {
        type: String
    },
    craetedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    priority: {
        type: String
    },
    issueType: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: String
    }
});

module.exports = model('Issue', issueSchema);