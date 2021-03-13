const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        issues: [Issue!]!
    }
    type Issue {
        _id: String!
        title: String!
    }
    type Mutation {
        createIssue(title: String!): Issue!
        deleteIssueById(_id: String!): Boolean!
        updateIssue(_id: String!, title: String!): Issue!
    }
`
module.exports = typeDefs;