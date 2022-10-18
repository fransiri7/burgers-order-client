import { React, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { editDelivery } from "./utils/service";
import swAlert from "sweetalert2";
import { red } from "@mui/material/colors";
import { PropTypes } from "prop-types";

export function DeliveryModal({ orderId, setOrders }) {
    const [deliveryText, setDeliveryText] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeliveryTextChange = event => {
        event.preventDefault();
        setDeliveryText(event.target.value);
    };

    const handleEditDelivery = async id => {
        try {
            await editDelivery(id, deliveryText);
            setOrders(orders =>
                orders.map(order => {
                    if (order.id === id) {
                        order.deliveredBy = deliveryText;
                    }
                    return order;
                })
            );
            setOpen(false);
        } catch (error) {
            setOpen(false);
            swAlert
                .fire({
                    title: error.message,
                    icon: "error",
                    confirmButtonColor: `${red[500]}`,
                    confirmButtonText: "Ok"
                })
                .then(() => {
                    window.location.reload();
                });
        }
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            color: theme => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid item container justifyContent="center">
                        <Grid item>
                            <Typography variant="body1">Who is delivering this order?</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid item container>
                        <Grid item>
                            <TextField
                                label="Delivery"
                                variant="outlined"
                                value={deliveryText}
                                onChange={handleDeliveryTextChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    handleEditDelivery(orderId);
                                }}
                            >
                                <SaveIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}

DeliveryModal.propTypes = {
    orderId: PropTypes.number.isRequired,
    setOrders: PropTypes.func.isRequired
};
