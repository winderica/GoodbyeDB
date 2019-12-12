import { pink } from '@material-ui/core/colors';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(({ zIndex }) => createStyles({
    progress: {
        position: 'fixed',
        zIndex: zIndex.modal + 1,
        top: 0,
        left: 0,
        width: '100%',
    },
    color: {
        backgroundColor: pink[500]
    },
    barColor: {
        backgroundColor: pink[100]
    }
}));
