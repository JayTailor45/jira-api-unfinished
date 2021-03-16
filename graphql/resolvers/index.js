const issuesResolvers = require('./issue');
const usersResolvers = require('./user');

module.exports = {
    Query: {
        ...issuesResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...issuesResolvers.Mutation,
    }
}