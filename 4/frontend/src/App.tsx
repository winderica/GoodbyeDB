import React, { FC } from 'react';

import { Index } from './views/Index';
import { ApolloProvider } from './providers/apollo';
import { SnackbarProvider } from './providers/snackbar';
import { ThemeProvider } from './providers/theme';

export const App: FC = () => (
    <ApolloProvider>
        <ThemeProvider>
            <SnackbarProvider>
                <Index />
            </SnackbarProvider>
        </ThemeProvider>
    </ApolloProvider>
);
