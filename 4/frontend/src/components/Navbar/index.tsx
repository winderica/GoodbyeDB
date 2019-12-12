import React, { FC } from 'react';
import cls from 'clsx';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import { useStyles } from '../../styles/navbar';

import { version } from '../../../package.json';

interface Props {
    open: boolean;
    toggleDrawer: () => void;
}

export const Navbar: FC<Props> = ({ open, toggleDrawer }) => {
    const classes = useStyles();
    const title = `Dashboard v${version}`;

    return (
        <>
            <AppBar position='fixed' className={cls(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar disableGutters={!open} classes={{ gutters: classes.appBarGutters, regular: classes.regular }}>
                    <IconButton
                        color='inherit'
                        onClick={toggleDrawer}
                        className={cls(classes.menuButton, { [classes.hide]: open })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap>{title}</Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};
