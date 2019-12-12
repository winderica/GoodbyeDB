import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';

import { getResolvers } from './resolver';
import { typeDefs } from './schema';

const startServer = async () => {
    const connection = await createConnection();

    const server = new ApolloServer({ typeDefs, resolvers: getResolvers(connection) });

    const app = express();

    server.applyMiddleware({
        app, cors: {
            credentials: true,
            origin: true
        }
    });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer().then();
