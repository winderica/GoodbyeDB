import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface Props {
    title: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: () => void;
}

export const FormDialog: FC<Props> = ({ title, open, setOpen, handleSubmit, children }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} disableScrollLock={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
