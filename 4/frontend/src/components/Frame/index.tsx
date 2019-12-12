import React, { FC, useState } from 'react';

import { useStyles } from '../../styles/frame';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

export const Frame: FC = ({ children }) => {
    const classes = useStyles();
    const [open, toggleOpen] = useState(false);
    const toggleDrawer = () => {
        toggleOpen(prevOpen => !prevOpen);
    };
    return (
        <div className={classes.root}>
            <Navbar open={open} toggleDrawer={toggleDrawer} />
            <Sidebar open={open} toggleDrawer={toggleDrawer} />
            <main className={classes.content} onClick={() => toggleOpen(false)}>
                {children}
            </main>
        </div>
    );
};
