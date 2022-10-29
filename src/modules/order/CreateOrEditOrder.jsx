/* eslint-disable */
import { React, useState } from "react";
import { Button, Grid, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAllProducts } from "../product/utils/apiHooks";
import { useEffect } from "react";

export function CreateOrEditOrder() {
    const [products, _, completed] = useAllProducts();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        notes: "",
        paymentMethod: "cash",
        takeAway: false,
        totalPrice: 0,
        products: []
    });

    useEffect(() => {
        if (completed && formData.products.length === 0) {
            const newFormData = { ...formData };
            newFormData.products.push({
                productId: products[0].id,
                quantity: 1,
                subtotal: products[0].price,
                notes: ""
            });
            newFormData.totalPrice = calculateTotal(newFormData.products);
            setFormData(newFormData);
        }
    }, [products]);

    const handleChange = (event, index) => {
        event.preventDefault();
        const newFormData = { ...formData };
        if (!(index >= 0)) {
            newFormData[event.target.name] = event.target.value;
        } else {
            const product = newFormData.products[index];
            product[event.target.name] = event.target.value;
            if (event.target.name === "quantity" || event.target.name === "productId") {
                const price = products.find(productToFind => productToFind.id === product.productId).price;
                product.subtotal = product.quantity * price;
            }
        }
        newFormData.totalPrice = calculateTotal(newFormData.products);
        setFormData(newFormData);
    };

    const addNewProduct = () => {
        const newFormData = { ...formData };
        newFormData.products.push({
            productId: products[0].id,
            quantity: 1,
            subtotal: products[0].price,
            notes: ""
        });
        newFormData.totalPrice = calculateTotal(newFormData.products);
        setFormData(newFormData);
    };

    const deleteProduct = index => {
        if (formData.products.length > 1) {
            const newFormData = { ...formData };
            newFormData.products.splice(index, 1);
            newFormData.totalPrice = calculateTotal(newFormData.products);
            setFormData(newFormData);
        }
    };

    const calculateTotal = products => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += parseInt(product.subtotal);
        });
        return totalPrice;
    };

    const handleSwitchChange = event => {
        event.preventDefault();
        const newFormData = { ...formData };
        if (event.target.name === "paymentMethod") {
            newFormData.paymentMethod = event.target.checked ? "cash" : "transfer";
        } else if (event.target.name === "takeAway") {
            newFormData.takeAway = event.target.checked;
            if (newFormData.takeAway) {
                newFormData.address = "";
            }
        }
        setFormData(newFormData);
    };

    return (
        <Grid container direction="column" justifyContent="space-around" alignItems="center">
            <Grid item container style={{ width: "83.5%" }}>
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        Create Order
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item md={8}>
                    <TextField label="Name" name="name" value={formData.name} variant="outlined" fullWidth onChange={handleChange} />
                </Grid>
                <Grid item container md={3}>
                    <Grid item>
                        <Typography variant="h6">Cash</Typography>
                    </Grid>
                    <Grid item>
                        <Switch name="paymentMethod" checked={formData.paymentMethod === "cash"} onChange={handleSwitchChange} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item md={8}>
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        disabled={formData.takeAway}
                    />
                </Grid>
                <Grid item container md={3}>
                    <Grid item>
                        <Typography variant="h6">Take Away</Typography>
                    </Grid>
                    <Grid item>
                        <Switch name="takeAway" checked={formData.takeAway} onChange={handleSwitchChange} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container alignItems="center" justifyContent="center">
                <Grid item md={12}>
                    <TextField
                        label="Order notes"
                        name="notes"
                        value={formData.notes}
                        multiline
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {formData.products.map((product, index) => {
                return (
                    <Grid key={index} item container direction="column" justifyContent="space-around" alignItems="center" spacing={2}>
                        <Grid item container>
                            <Grid item md={8}>
                                <Select
                                    style={{ width: "96%" }}
                                    value={product.productId}
                                    name="productId"
                                    onChange={event => handleChange(event, index)}
                                >
                                    {products.map(elem => {
                                        return (
                                            <MenuItem key={elem.id} value={elem.id}>
                                                {elem.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item container md={1} alignItems="center" justifyContent="center" spacing={1}>
                                <Grid item>
                                    <TextField
                                        label="Burgers"
                                        type="number"
                                        value={product.quantity}
                                        name="quantity"
                                        onChange={event => handleChange(event, index)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container md={1} alignItems="center" justifyContent="center" spacing={1}>
                                <Grid item>
                                    <TextField
                                        label="Subtotal"
                                        value={product.subtotal}
                                        name="subtotal"
                                        onChange={event => handleChange(event, index)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container md={2} alignItems="center" justifyContent="center" spacing={1}>
                                <Grid item>
                                    <Button variant="outlined" onClick={addNewProduct}>
                                        +
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={() => deleteProduct(index)}>
                                        -
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" justifyContent="center">
                            <Grid item md={12}>
                                <TextField
                                    label="Notes product"
                                    multiline
                                    variant="outlined"
                                    fullWidth
                                    value={product.notes}
                                    name="notes"
                                    onChange={event => handleChange(event, index)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}

            <Grid item container alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Total ${formData.totalPrice}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item container md={3} justifyContent="space-around">
                    <Grid item>
                        <Button variant="outlined" size="large">
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="large">
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
