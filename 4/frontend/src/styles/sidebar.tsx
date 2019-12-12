import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { drawerWidth } from './index';

export const useStyles = makeStyles<Theme>(({ transitions, mixins, spacing, breakpoints }) => createStyles({
    drawerPaper: {
        position: 'sticky',
        top: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        width: drawerWidth,
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen,
        }),
        width: spacing(9),
        [breakpoints.down('sm')]: {
            border: 0,
            width: 0,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: `0 ${spacing(1)}px`,
        ...mixins.toolbar,
    },
    icon: {
        margin: `0 ${spacing(1)}px`
    }
}));
