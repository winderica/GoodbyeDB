import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToAlpha } from './index';

export const useStyles = makeStyles<Theme>(({ palette, spacing, breakpoints }) => createStyles({
    root: {
        display: 'flex',
        backgroundColor: colorToAlpha(palette.secondary.light, 0.2),
    },
    content: {
        flexGrow: 1,
        marginTop: spacing(8),
        height: 'calc(100vh - 64px)',
        overflowX: 'auto',
        [breakpoints.down('xs')]: {
            marginTop: spacing(6),
            height: 'calc(100vh - 48px)',
        },
    },
}));
