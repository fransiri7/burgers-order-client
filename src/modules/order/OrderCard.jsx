/* eslint-disable */
import React from "react";
import { Card, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export function OrderCard({ order }) {
    return (
        <Card style={{ border: "1px solid black", width: "100%", borderRadius: "10px" }}>
            <Grid container direction="column" style={{ backgroundColor: "red" }}>
                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                    style={{ backgroundColor: "yellow", height: "15%" }}
                >
                    <Grid item md={4} style={{ backgroundColor: "brown", marginLeft: "1%" }}>
                        {order.time}
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
                <Grid
                    item
                    container
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ backgroundColor: "turquoise", height: "20%" }}
                >
                    <Grid item md={8}>
                        {order.address}
                    </Grid>

                    <Grid item md={4}>
                        {order.deliveredBy}
                    </Grid>
                </Grid>

                <Grid item container style={{ backgroundColor: "beige", height: "45%" }}>
                    {order.products[0].name}
                </Grid>

                <Grid item container justifyContent="center" alignItems="center" style={{ backgroundColor: "orange", height: "10%" }}>
                    <Grid item>${order.totalPrice}</Grid>
                    <Grid item>
                        <IconButton style={{ cursor: "default" }}>
                            <CreditCardIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" style={{ backgroundColor: "cornflowerblue", height: "10%" }}>
                    <Grid item>{order.notes}</Grid>
                </Grid>
            </Grid>
        </Card>
    );
}
