import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";

const products = [
    {
        name: "BlueCheese",
        description: "pan,cebolla,roquefort,medallon,mozza,pan",
        price: 850,
        hexColor: "blue",
        status: true
    },
    {
        name: "Capresse",
        description: "pan,tomate,albahaca,medallon,mozza,pan",
        price: 850,
        hexColor: "green",
        status: true
    },
    {
        name: "Veggie",
        description: "pan,tomate,albahaca,medallon de lenteja,mozza,pan",
        price: 850,
        hexColor: "black",
        status: true
    }
];

export function ProductsList() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>hexColor</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="right">Actions</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(row => (
                        <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell>{row.hexColor}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell align="right">
                                <EditIcon />
                                <MenuIcon />
                            </TableCell>
                            <TableCell align="right">
                                <Switch />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
