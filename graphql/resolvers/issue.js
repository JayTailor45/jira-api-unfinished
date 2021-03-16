const Issue = require('../../schema/issue');

module.exports = {
    Query: {
        issues: async () => {
            try {
                const issues = await Issue.find();
                return issues;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        createIssue: async (_, { title }) => {
            const issue = new Issue({ title });
            const savedIsssue = await issue.save();
            if (!savedIsssue) {
                throw Error('Error in creating new issue');
            }
            return savedIsssue;
        },
        deleteIssueById: async (_, { _id }) => {
            const issue = await Issue.findOneAndDelete({ _id });
            if (issue && issue.$isDeleted) {
                return true;
            }
            return false;
        },
        updateIssue: async (_, args) => {
            const { _id } = args;
            const issue = Issue.findOne({ _id });
            if (!issue) {
                throw Error('Issue not found');
            } else {
                const updatedIssue = await Issue.findOneAndUpdate({ _id }, args);
                if (!updatedIssue) {
                    throw Error('Updating issue failed')
                } else {
                    return await Issue.findOne({ _id })
                }
            }
        },
    }
}