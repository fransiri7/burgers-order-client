import React from "react";
import { Card, Divider, Grid, IconButton, Paper, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import SaveIcon from "@mui/icons-material/Save";
import { PropTypes } from "prop-types";
import moment from "moment";

export function OrderCard({ order }) {
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
                            {order.status === false ? (
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
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ textAlign: "center" }}>
                    {order.name}
                </Grid>
                <Divider />
                <Grid item container justifyContent="space-evenly" alignItems="center">
                    <Grid item md={7} style={{ paddingLeft: "2%" }}>
                        {order.address}
                    </Grid>
                    {!order.takeAway ? (
                        <Grid item container md={5}>
                            <Grid item md={7}>
                                <TextField label="deliveredBy" size="small"></TextField>
                            </Grid>
                            <Grid item container md={5}>
                                <Grid item md={6}>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item md={6}>
                                    <IconButton>
                                        <SaveIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>

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
    })
};
