import { amber, blue, green, red } from '@material-ui/core/colors';

export const warningColor = amber[700];
export const dangerColor = red[700];
export const successColor = green[600];
export const infoColor = blue[700];

export const drawerWidth = 200;

export const colorToAlpha = (hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || ['', '', ''];
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
