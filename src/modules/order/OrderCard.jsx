import React from "react";
import { Card, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { PropTypes } from "prop-types";
import moment from "moment";

export function OrderCard({ order }) {
    return (
        <Card style={{ border: "1px solid black", width: "100%", borderRadius: "10px" }}>
            <Grid container direction="column" style={{ backgroundColor: "red", width: "100%" }}>
                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                    style={{ backgroundColor: "yellow" }}
                >
                    <Grid item md={4} style={{ backgroundColor: "brown", marginLeft: "1%" }}>
                        {moment(order.time).format("HH:mm")}
                    </Grid>

                    <Grid item container md={5} justifyContent="flex-end" style={{ backgroundColor: "violet" }}>
                        <Grid item>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <UnpublishedIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ backgroundColor: "green", textAlign: "center" }}>
                    {order.name}
                </Grid>
                <Grid item container justifyContent="space-evenly" alignItems="center" style={{ backgroundColor: "turquoise" }}>
                    <Grid item md={8} style={{ paddingLeft: "2%" }}>
                        {order.address}
                    </Grid>

                    <Grid item md={4}>
                        {order.deliveredBy}
                    </Grid>
                </Grid>

                <Grid item container direction="column" style={{ backgroundColor: "beige" }}>
                    {order.products.map(product => (
                        <Grid
                            key={product.orderProduct.id}
                            item
                            container
                            justifyContent="space-around"
                            alignItems="center"
                            style={{ backgroundColor: "red" }}
                        >
                            <Grid item container md={10} alignItems="center" style={{ backgroundColor: "blue" }}>
                                <Grid item>
                                    <IconButton style={{ cursor: "default" }}>
                                        <LunchDiningIcon style={{ color: product.hexColor }} />
                                    </IconButton>
                                </Grid>
                                <Grid item>{product.orderProduct.quantity}</Grid>
                                <Grid item style={{ backgroundColor: "brown", marginLeft: "1%" }}>
                                    {product.name}
                                </Grid>
                            </Grid>

                            <Grid item md={2} style={{ backgroundColor: "yellow" }}>
                                ${product.price}
                            </Grid>
                            <Grid item md={12} style={{ backgroundColor: "grey", paddingLeft: "10%", paddingRight: "10%" }}>
                                {product.orderProduct.notes}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

                <Grid item container justifyContent="center" alignItems="center" style={{ backgroundColor: "orange" }}>
                    <Grid item>${order.totalPrice}</Grid>
                    <Grid item>
                        <IconButton style={{ cursor: "default" }}>
                            <CreditCardIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" style={{ backgroundColor: "cornflowerblue" }}>
                    <Grid item>{order.notes}</Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        address: PropTypes.string,
        status: PropTypes.bool,
        notes: PropTypes.string,
        paymentMethod: PropTypes.oneOf(["cash", "transfer"]),
        deliveredBy: PropTypes.string,
        takeAway: PropTypes.bool,
        totalPrice: PropTypes.number,
        time: PropTypes.string,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                price: PropTypes.number,
                hexColor: PropTypes.string,
                orderProduct: PropTypes.shape({
                    id: PropTypes.number,
                    orderId: PropTypes.number,
                    productId: PropTypes.number,
                    quantity: PropTypes.number,
                    subtotal: PropTypes.number,
                    notes: PropTypes.string
                })
            })
        )
    })
};
