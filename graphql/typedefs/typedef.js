const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        issues: [Issue]!
        users: [User]!
    }
    type Issue {
        _id: ID!
        title: String!
        ticketKey: String!
        createdBy: String!
        assignedTo: String!
        priority: String!
        issueType: String!
        status: String!
        createdAt: String!
    }
    input RegisterInput {
        email: String!
        password: String!
    }
    type User {
        _id: ID!
        email: String!
        password: String!
        createdAt: String!
        token: String!
    }
    type Mutation {
        createIssue(title: String!, assignedTo: String, priority: String, issueType: String, status: String): Issue!
        deleteIssueById(_id: ID!): Boolean!
        getIssue(_id: ID!): Issue!
        updateIssue(_id: ID!, title: String!): Issue!
        createUser(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
`
module.exports = typeDefs;