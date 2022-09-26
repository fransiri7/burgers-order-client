import { Grid, Button } from "@mui/material";
import React from "react";
// FormControl, InputLabel, Input, FormHelperText,

export function CreateProduct() {
    return (
        <Grid container direction="column" alignItems="center" style={{ backgroundColor: "red", height: "80vh" }}>
            <Grid item container direction="column" style={{ backgroundColor: "blue", height: "45%" }}>
                <Grid item md={1} style={{ backgroundColor: "yellow" }}>
                    <h1>nombre del producto</h1>
                </Grid>
                <Grid item md={7} style={{ backgroundColor: "green" }}>
                    <h1>desccripcion del producto</h1>
                </Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="space-between" style={{ backgroundColor: "brown", height: "45%" }}>
                <Grid item md={4} style={{ backgroundColor: "cyan" }}>
                    <h1>precio</h1>
                </Grid>
                <Grid item md={4} style={{ backgroundColor: "grey" }}>
                    <h1>tableta de colores</h1>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignContent="space-around"
                style={{ backgroundColor: "black", height: "10%" }}
            >
                <Grid item>
                    <Button variant="outlined">Back</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Create</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
