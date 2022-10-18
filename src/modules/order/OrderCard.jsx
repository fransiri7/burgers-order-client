import React from "react";
import { Card, Divider, Grid, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { PropTypes } from "prop-types";
import moment from "moment";
import swAlert from "sweetalert2";
import { green, red } from "@mui/material/colors";
import { deleteOrder } from "./utils/service";
import { DeliveryModal } from "./DeliveryModal";

export function OrderCard({ order, setOrders }) {
    const deleteOrderWithAlert = id => {
        swAlert
            .fire({
                title: `Are you sure you want to delete ${order.name}'s order?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: `${green[500]}`,
                cancelButtonColor: `${red[500]}`,
                confirmButtonText: "Delete it!"
            })
            .then(async result => {
                try {
                    if (result.isConfirmed) {
                        const msg = await deleteOrder(id);
                        swAlert.fire({
                            title: msg,
                            confirmButtonColor: `${green[500]}`
                        });
                        setOrders(orders => orders.filter(order => order.id !== id));
                    }
                } catch (error) {
                    swAlert
                        .fire({
                            title: "ERROR!",
                            text: error.message,
                            icon: "error",
                            confirmButtonColor: `${red[500]}`
                        })
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
    };
    return (
        <Card
            component={Paper}
            elevation={10}
            style={{ border: `2px solid ${order.status ? "green" : "red"}`, width: "100%", borderRadius: "10px" }}
        >
            <Grid container direction="column">
                <Grid item container justifyContent="space-between" alignContent="center" alignItems="center">
                    <Grid item md={4} style={{ marginLeft: "1%" }}>
                        {moment(order.time).format("HH:mm")}
                    </Grid>

                    <Grid item container md={5} justifyContent="flex-end">
                        <Grid item>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            {!order.status ? (
                                <IconButton>
                                    <TaskAltIcon />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <UnpublishedIcon />
                                </IconButton>
                            )}
                        </Grid>

                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    deleteOrderWithAlert(order.id);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ textAlign: "center" }}>
                    {order.name}
                </Grid>
                <Divider />
                {!order.takeAway ? (
                    <Grid item container justifyContent="space-evenly" alignItems="center">
                        <Grid item md={7} style={{ paddingLeft: "2%" }}>
                            {order.address}
                        </Grid>
                        <Grid item container md={5} alignItems="center" justifyContent="space-between">
                            <Grid item container md={10} justifyContent="flex-start" alignItems="center">
                                <Grid item>
                                    <IconButton style={{ cursor: "default" }}>
                                        <DeliveryDiningIcon />
                                    </IconButton>
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "65%",
                                        direction: "ltr"
                                    }}
                                >
                                    {order.deliveredBy}
                                </Grid>
                            </Grid>

                            <Grid item container md={2} justifyContent="flex-end">
                                <Grid item>
                                    <DeliveryModal />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}

                <Grid item container direction="column">
                    {order.products.map(product => (
                        <Grid item container key={product.orderProduct.id} direction="column">
                            <Grid item container justifyContent="space-around" alignItems="center">
                                <Grid item container md={10} alignItems="center">
                                    <Grid item style={{ marginLeft: "3%" }}>
                                        <IconButton style={{ cursor: "default" }}>
                                            <LunchDiningIcon style={{ color: product.hexColor }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        {product.orderProduct.quantity} {product.name}
                                    </Grid>
                                </Grid>

                                <Grid item md={2}>
                                    ${product.price}
                                </Grid>
                            </Grid>

                            {product.orderProduct.notes ? (
                                <Grid item container alignItems="center" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                                    <Grid item>
                                        <IconButton style={{ cursor: "default" }}>
                                            <WarningRoundedIcon fontSize="small" style={{ color: "orange" }} />
                                        </IconButton>
                                    </Grid>

                                    <Grid item fontSize="70%">
                                        {product.orderProduct.notes}
                                    </Grid>
                                </Grid>
                            ) : null}
                        </Grid>
                    ))}
                </Grid>

                <Grid item container justifyContent="center" alignItems="center">
                    <Grid item>${order.totalPrice}</Grid>
                    <Grid item>
                        {order.paymentMethod === "cash" ? (
                            <IconButton style={{ cursor: "default" }}>
                                <MoneyRoundedIcon />
                            </IconButton>
                        ) : (
                            <IconButton style={{ cursor: "default" }}>
                                <CreditCardIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
                {order.notes ? (
                    <Grid item container alignItems="center" justifyContent="center">
                        <Grid item>
                            <IconButton style={{ cursor: "default" }}>
                                <PriorityHighRoundedIcon style={{ color: "red" }} />
                            </IconButton>
                        </Grid>
                        <Grid item fontSize="70%">
                            {order.notes}
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>
        </Card>
    );
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string,
        status: PropTypes.bool.isRequired,
        notes: PropTypes.string,
        paymentMethod: PropTypes.oneOf(["cash", "transfer"]),
        deliveredBy: PropTypes.string,
        takeAway: PropTypes.bool.isRequired,
        totalPrice: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                hexColor: PropTypes.string.isRequired,
                orderProduct: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    orderId: PropTypes.number.isRequired,
                    productId: PropTypes.number.isRequired,
                    quantity: PropTypes.number.isRequired,
                    subtotal: PropTypes.number.isRequired,
                    notes: PropTypes.string
                })
            })
        )
    }),
    setOrders: PropTypes.func.isRequired
};
