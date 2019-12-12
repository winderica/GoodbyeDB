import React, { FC } from 'react';
import { ApolloProvider as Apollo } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { GRAPHQL_API } from '../configs/consts';

const client = new ApolloClient({
    uri: GRAPHQL_API,
});

export const ApolloProvider: FC = ({ children }) => (
    <Apollo client={client}>
        {children}
    </Apollo>
);

