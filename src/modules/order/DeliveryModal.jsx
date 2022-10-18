/* eslint-disable */
import { React, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export function DeliveryModal() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open} width="70%">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <Grid item container justifyContent="center">
                        <Grid item>
                            <Typography variant="h6">Who is delivering this order?</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid item container alignItems="center" justifyContent="space-around">
                        <Grid item>
                            <TextField size="small" />
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <SaveIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
