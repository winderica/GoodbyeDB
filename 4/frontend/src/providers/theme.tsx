import React, { FC } from 'react';

import { CssBaseline } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider as Theme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: grey,
    }
});

export const ThemeProvider: FC = ({ children }) => (
    <Theme theme={theme}>
        <CssBaseline />
        {children}
    </Theme>
);
