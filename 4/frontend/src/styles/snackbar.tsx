import { createStyles, makeStyles } from '@material-ui/core/styles';

import { dangerColor, infoColor, successColor, warningColor } from './index';

export const useStyles = makeStyles(() => createStyles({
    success: { backgroundColor: successColor },
    error: { backgroundColor: dangerColor },
    warning: { backgroundColor: warningColor },
    info: { backgroundColor: infoColor },
}));
