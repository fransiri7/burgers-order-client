import { React, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { PropTypes } from "prop-types";

export function ProductDetailModal({ product }) {
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
                <MenuIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open} fullWidth style={{ textAlign: "center" }}>
                <DialogTitle sx={{ m: 0, p: 2 }} style={{ color: product.hexColor, fontWeight: "bold", fontSize: "35px" }}>
                    {product.name}
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
        </>
    );
}

ProductDetailModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        hexColor: PropTypes.string
    })
};
