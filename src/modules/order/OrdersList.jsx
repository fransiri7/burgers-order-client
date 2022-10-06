import React from "react";
import { OrderCard } from "./OrderCard";
import { Grid } from "@mui/material";

export function OrdersList() {
    const orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Grid container direction="column" justifyContent="space-between" style={{ backgroundColor: "blue", height: "80vh" }}>
            <Grid item alignItems="center" style={{ backgroundColor: "green", height: "10%" }}>
                ACA VAN A IR LOS SELECTS PARA FECHAS
            </Grid>
            <Grid item container style={{ backgroundColor: "pink", height: "85%", overflowY: "scroll" }}>
                {orders.map(order => {
                    return (
                        <Grid key={order} item container justifyContent="center" md={4} style={{ marginTop: "15px", marginBottom: "5px" }}>
                            <Grid item md={11}>
                                <OrderCard />
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
}
