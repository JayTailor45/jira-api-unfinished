const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String
    }
});

module.exports = mongoose.model('Issue', issueSchema);