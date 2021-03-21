const { Schema, model } = require('mongoose');

const issueSchema = new Schema({
    title: {
        type: String
    },
    ticketKey: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    priority: {
        type: String,
        default: 'MEDIUM'
    },
    issueType: {
        type: String,
        default: 'TASK'
    },
    status: {
        type: String,
        default: 'TODO'
    },
    createdAt: {
        type: String,
    }
});

module.exports = model('Issue', issueSchema);