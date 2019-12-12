import React, { FC } from 'react';

import cls from 'clsx';

import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { Book as BookIcon, ChevronLeft as ChevronLeftIcon, People as PeopleIcon, ShowChart as ShowChartIcon } from '@material-ui/icons';

import { useStyles } from '../../styles/sidebar';
import Anchor from '../Anchor';

const listItems = [
    { to: '/student', text: 'student', icon: <PeopleIcon /> },
    { to: '/sc', text: 'sc', icon: <ShowChartIcon /> },
    { to: '/course', text: 'course', icon: <BookIcon /> },
];

interface Props {
    open: boolean;
    toggleDrawer: () => void;
}

export const Sidebar: FC<Props> = ({ open, toggleDrawer }) => {
    const classes = useStyles();

    return (
        <Drawer
            variant='permanent'
            classes={{ paper: cls(classes.drawerPaper, !open && classes.drawerPaperClose) }}
            open={open}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {listItems.map(({ to, text, icon }, index) =>
                    <Anchor to={to} key={index}>
                        <ListItem button onClick={open ? toggleDrawer : undefined}>
                            <ListItemIcon className={classes.icon}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Anchor>,
                )}
            </List>
        </Drawer>
    );
};
