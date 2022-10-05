/* eslint-disable */

import { React, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export function ProductDetailModal({ product }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open} fullWidth style={{ textAlign: "center" }}>
                <DialogTitle sx={{ m: 0, p: 2 }} style={{ color: product.hexColor }}>
                    <Typography gutterBottom variant="h4" style={{ fontWeight: "bold" }}>
                        {product.name}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{product.description}</Typography>
                    <Typography gutterBottom variant="h5" style={{ fontWeight: "bold", marginTop: "30px" }}>
                        ${product.price}
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
