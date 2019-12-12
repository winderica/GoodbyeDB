export enum Order {
    asc,
    desc
}

export const desc = <T>(a: T, b: T, orderBy: keyof T) => {
    const i = typeof a[orderBy] === 'boolean' ? Number(a[orderBy]) : a[orderBy];
    const j = typeof b[orderBy] === 'boolean' ? Number(b[orderBy]) : b[orderBy];
    if (j < i) {
        return -1;
    }
    if (j > i) {
        return 1;
    }
    return 0;
};

export const stableSort = <T>(array: T[], cmp: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

export const getSorting = <T>(order: Order, orderBy: keyof T): (a: T, b: T) => number => order
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
