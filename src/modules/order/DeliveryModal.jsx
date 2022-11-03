import { React, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { editDelivery } from "./utils/service";
import swAlert from "sweetalert2";
import { grey, red } from "@mui/material/colors";
import { PropTypes } from "prop-types";
import { formatText } from "../../utils/utils";

export function DeliveryModal({ orderId, setOrders }) {
    const [deliveryName, setDeliveryName] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeliveryTextChange = e => {
        setDeliveryName(e.target.value);
    };

    const handleEditDelivery = async () => {
        try {
            const newDeliveryName = formatText(deliveryName);
            await editDelivery(orderId, newDeliveryName);
            setOrders(orders =>
                orders.map(order => {
                    if (order.id === orderId) {
                        order.deliveredBy = newDeliveryName;
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

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            handleEditDelivery();
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
                            color: grey[500]
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
                                value={deliveryName}
                                onChange={handleDeliveryTextChange}
                                onKeyDown={handleKeyDown}
                                size="small"
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleEditDelivery}>
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
