import React, { FC } from 'react';

import { LinearProgress } from '@material-ui/core';

import { useStyles } from '../../styles/progress';

export const Progress: FC = () => {
    const classes = useStyles();
    return (
        <LinearProgress className={classes.progress} color='primary' classes={{
            colorPrimary: classes.color,
            barColorPrimary: classes.barColor,
        }} />
    );
};
