import React, { FC } from 'react';

import { SnackbarProvider as Snackbar } from 'notistack';

import { useStyles } from '../styles/snackbar';

export const SnackbarProvider: FC = ({ children }) => {
    const classes = useStyles();
    return (
        <Snackbar
            maxSnack={5}
            classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
            }}
            autoHideDuration={3000}
        >
            {children}
        </Snackbar>
    );
};
