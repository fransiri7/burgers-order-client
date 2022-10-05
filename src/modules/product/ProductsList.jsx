import { React, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import {
    Button,
    Grid,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAllProducts } from "./utils/apiHooks";
import { Loading } from "../../components/loading/Loading";
import { editProductStatus } from "./utils/service";
import { red } from "@mui/material/colors";
import swAlert from "sweetalert2";
import { ProductDetailModal } from "./ProductDetailModal";

export function ProductsList() {
    const [products, setProducts, getProductsCompleted] = useAllProducts();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const handleSearchTextChange = event => {
        event.preventDefault();
        setSearchText(event.target.value);
    };

    const filterProducts = (productsToFilter, searchText) => {
        return productsToFilter
            .sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                else return 0;
            })
            .filter(
                product =>
                    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchText.toLowerCase())
            );
    };
    const getSearchWording = () => {
        const noResults = !filterProducts(products, searchText).length;
        return noResults ? (
            <span>
                No results found for <i>`{searchText}`</i>
            </span>
        ) : (
            <span>
                Results for <i>`{searchText}`</i>
            </span>
        );
    };

    const handleSwitchChange = async id => {
        try {
            await editProductStatus(id);
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
                    <TextField label="Filter Product" variant="outlined" fullWidth value={searchText} onChange={handleSearchTextChange} />
                </Grid>
                {searchText ? (
                    <Grid item md={5}>
                        <Typography variant="h6">{getSearchWording()}</Typography>
                    </Grid>
                ) : null}
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
                            {filterProducts(products, searchText).map(product => (
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
                                        <IconButton
                                            onClick={() => {
                                                navigate(`/products/edit/${product.id}`);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <ProductDetailModal product={product} />
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
