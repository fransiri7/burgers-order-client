/* eslint-disable */

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import { Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const products = [];

export function ProductsList() {
    return (
        <Grid container direction="column" style={{ height: "80vh" }}>
            <Grid item container justifyContent="space-between" alignItems="center" style={{ height: "15%" }}>
                <Grid item md={3}>
                    <TextField label="Filter Product" variant="outlined" fullWidth />
                </Grid>
                <Grid item md={2}>
                    <Button variant="contained" style={{ width: "90%" }}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <Grid item container style={{ height: "85%" }}>
                <TableContainer component={Paper} style={{ maxHeight: "100%" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width="10%" align="center"></TableCell>
                                <TableCell width="30%">Name</TableCell>
                                <TableCell width="20%">Price</TableCell>
                                <TableCell width="20%" align="center">
                                    Status
                                </TableCell>
                                <TableCell width="20%" align="center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product.name}>
                                    <TableCell align="center">
                                        <LunchDiningTwoToneIcon fontSize="large" style={{ color: product.hexColor }} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell align="center">
                                        <Switch />
                                    </TableCell>
                                    <TableCell align="center">
                                        <EditIcon style={{ marginRight: "15px" }} />
                                        <MenuIcon style={{ marginLeft: "15px" }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
