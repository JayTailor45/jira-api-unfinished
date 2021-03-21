const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typedefs/typedef');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });

    await mongoose.connect('mongodb://localhost:27017/jira-clone', { useUnifiedTopology: true, useNewUrlParser: true });

    server.listen().then(res => {
        console.log(`🚀 Server started at ${res.url}`);
    });

}

startServer();