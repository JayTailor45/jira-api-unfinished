const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        issues: [Issue!]!
        users: [User!]!
    }
    type Issue {
        _id: String!
        title: String!
    }
    input RegisterInput {
        email: String!
        password: String!
    }
    type User {
        _id: String!
        email: String!
        password: String!
        createdAt: String!
    }
    type Mutation {
        createIssue(title: String!): Issue!
        deleteIssueById(_id: String!): Boolean!
        updateIssue(_id: String!, title: String!): Issue!
        createUser(registerInput: RegisterInput): User!
    }
`
module.exports = typeDefs;