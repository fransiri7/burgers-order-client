import { Grid, Button, Typography } from "@mui/material";
import React from "react";

export function CreateProduct() {
    return (
        <Grid container direction="column" alignItems="center" style={{ backgroundColor: "red", height: "80vh" }}>
            <Grid item container justifyContent="flex-start" alignItems="center" style={{ backgroundColor: "blue", height: "10%" }}>
                <Grid item>
                    <Typography variant="h4">Create Product</Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ backgroundColor: "green", height: "10%", width: "100%" }}>
                <Grid item>
                    <span>nombre del producto</span>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ backgroundColor: "yellow", height: "25%", width: "100%" }}>
                <Grid item>
                    <span>desccripcion del producto</span>
                </Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="space-between" style={{ height: "45%" }}>
                <Grid item md={4} style={{ backgroundColor: "cyan" }}>
                    <span>precio</span>
                </Grid>
                <Grid item md={4} style={{ backgroundColor: "grey" }}>
                    <h1>tableta de colores</h1>
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignContent="center"
                style={{ backgroundColor: "black", height: "10%" }}
            >
                <Grid
                    item
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    md={3}
                    style={{ backgroundColor: "violet", height: "100%" }}
                >
                    <Grid item>
                        <Button variant="outlined">Back</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined">Create</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
