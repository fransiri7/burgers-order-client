import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import { Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAllProducts } from "./utils/apiHooks";
import { Loading } from "../../components/loading/Loading";
import { editStatusProduct } from "./utils/service";
import { red } from "@mui/material/colors";
import swAlert from "sweetalert2";

export function ProductsList() {
    const [products, setProducts, getProductsCompleted] = useAllProducts();
    const navigate = useNavigate();

    const handleSwitchChange = async id => {
        try {
            await editStatusProduct(id);
            const updatedProducts = products.map(product => {
                if (product.id === id) {
                    product.status = !product.status;
                }
                return product;
            });
            setProducts(updatedProducts);
        } catch (error) {
            swAlert.fire({
                title: "ERROR!",
                text: error.message,
                icon: "error",
                confirmButtonColor: `${red[500]}`
            });
        }
    };

    if (!getProductsCompleted) {
        return <Loading />;
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
                                        <Switch checked={product.status} onChange={() => handleSwitchChange(product.id)} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <EditIcon
                                            style={{ marginRight: "15px" }}
                                            cursor="pointer"
                                            onClick={() => {
                                                navigate(`/products/edit/${product.id}`);
                                            }}
                                        />
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
