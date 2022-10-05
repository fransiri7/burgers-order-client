import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import {
    Button,
    Grid,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Stack,
    LinearProgress,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAllProducts } from "./utils/apiHooks";
import { ProductDetailModal } from "./ProductDetailModal";

export function ProductsList() {
    const [products, getProductsCompleted] = useAllProducts();
    const navigate = useNavigate();

    if (!getProductsCompleted) {
        return (
            <Stack sx={{ width: "80%" }} spacing={2}>
                <LinearProgress style={{ marginTop: "200px", color: "inherit" }} />
            </Stack>
        );
    }
    return (
        <Grid container direction="column" justifyContent="space-between" style={{ height: "80vh" }}>
            <Grid item container justifyContent="space-between" alignItems="center" style={{ height: "10%" }}>
                <Grid item md={3}>
                    <TextField label="Filter Product" variant="outlined" fullWidth />
                </Grid>
                <Grid item md={3}>
                    <Button
                        variant="outlined"
                        style={{ width: "90%" }}
                        onClick={() => {
                            navigate("/products/create");
                        }}
                    >
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <Grid item style={{ height: "85%" }}>
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
                                        <IconButton align="center">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton align="center">
                                            <ProductDetailModal product={product} />
                                        </IconButton>
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
