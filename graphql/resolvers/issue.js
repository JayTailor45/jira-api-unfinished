const Issue = require('../../schema/issue');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        issues: async (_, __, context) => {
            const user = checkAuth(context);
            try {
                const issues = await Issue.find().sort({ createdAt: -1 });
                return issues;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        createIssue: async (_, { title, assignedTo, priority, issueType, status }, context) => {
            const user = checkAuth(context);
            try {
                const issueCount = await Issue.find().count() + 1;
                const ticketKey = `TKT-${issueCount}`;
                const issue = new Issue({ title, createdBy: user._id, assignedTo, priority, issueType, status, ticketKey, createdAt: new Date().toISOString() });
                console.log(issue);
                const savedIsssue = await issue.save();
                if (!savedIsssue) {
                    throw Error('Error in creating new issue');
                }
                return savedIsssue;
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteIssueById: async (_, { _id }, context) => {
            const user = checkAuth(context);
            try {
                const issue = await Issue.findOneAndDelete({ _id });
                if (issue && issue.$isDeleted) {
                    return true;
                }
            } catch (err) {
                throw new Error(err);
            }
            return false;
        },
        updateIssue: async (_, args, context) => {
            const { _id } = args;
            const user = checkAuth(context);
            try {
                const issue = Issue.findOne({ _id });
                if (!issue) {
                    throw Error('Issue not found');
                } else {
                    const updatedIssue = await Issue.findOneAndUpdate({ _id }, args);
                    if (!updatedIssue) {
                        throw Error('Updating issue failed');
                    } else {
                        return await Issue.findOne({ _id })
                    }
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        getIssue: async (_, { _id }, context) => {
            const user = checkAuth(context);
            try {
                const issue = new Issue({ _id });
                if (issue) {
                    return savedIsssue;
                } else {
                    throw Error('Post not found');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    }
}