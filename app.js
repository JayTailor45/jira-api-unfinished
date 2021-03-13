const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');

const startServer = async () => {

    const app = express();
    const PORT = 4000;

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    server.applyMiddleware({ app });

    await mongoose.connect('mongodb://localhost:27017/jira-clone', { useUnifiedTopology: true, useNewUrlParser: true });

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });

}

startServer();