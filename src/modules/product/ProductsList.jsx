import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import { Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const products = [
    {
        name: "BlueCheese",
        description: "pan,cebolla,roquefort,medallon,mozza,pan",
        price: 850,
        hexColor: "0000FF",
        status: true
    },
    {
        name: "Capresse",
        description: "pan,tomate,albahaca,medallon,mozza,pan",
        price: 850,
        hexColor: "ff0000",
        status: true
    },
    {
        name: "Veggie",
        description: "pan,tomate,albahaca,medallon de lenteja,mozza,pan",
        price: 850,
        hexColor: "#F29A86",
        status: true
    }
];

export function ProductsList() {
    return (
        <Grid container>
            <Grid item container justifyContent="space-between" alignItems="stretch" style={{ height: "10%" }}>
                <Grid item>
                    <TextField label="Filter Product" variant="outlined" fullWidth style={{ backgroundColor: "white" }} />
                </Grid>
                <Grid item>
                    <Button variant="contained">Add Product</Button>
                </Grid>
            </Grid>
            <Grid item container style={{ height: "90%" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            {products.map(row => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">
                                        <LunchDiningTwoToneIcon fontSize="large" style={{ color: row.hexColor }} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>${row.price}</TableCell>
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
