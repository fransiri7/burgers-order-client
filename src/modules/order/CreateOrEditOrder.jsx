/* eslint-disable */
import { React, useState } from "react";
import { Button, Grid, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAllProducts } from "../product/utils/apiHooks";

export function CreateOrEditOrder() {
    const [products] = useAllProducts();
    console.log(products);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        notes: "",
        paymentMethod: "cash",
        deliveredBy: false,
        takeAway: false,
        totalPrice: "",
        time: "",
        products: []
    });
    const [errors, setErrors] = useState({});

    const validate = form => {
        const errors = {};
        if (!form.name) {
            errors.name = "Name is required";
        }
        if (!form.takeAway) {
            if (!form.addres) {
                errors.address = "Addres is required";
            }
        }
        return errors;
    };

    const handleChange = event => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setErrors(
            validate({
                ...formData,
                [event.target.name]: event.target.value
            })
        );
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
                        <Switch />
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
                    />
                </Grid>
                <Grid item container md={3}>
                    <Grid item>
                        <Typography variant="h6">Take Away</Typography>
                    </Grid>
                    <Grid item>
                        <Switch />
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

            <Grid item container direction="column" justifyContent="space-around" alignItems="center" spacing={2}>
                <Grid item container>
                    <Grid item md={8}>
                        <Select style={{ width: "96%" }}>
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
                            <TextField label="Burgers" type="number" />
                        </Grid>
                    </Grid>
                    <Grid item container md={1} alignItems="center" justifyContent="center" spacing={1}>
                        <Grid item>
                            <TextField label="Subtotal" defaultValue="$ 1500" />
                        </Grid>
                    </Grid>
                    <Grid item container md={2} alignItems="center" justifyContent="center" spacing={1}>
                        <Grid item>
                            <Button variant="outlined">+</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined">-</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" justifyContent="center">
                    <Grid item md={12}>
                        <TextField label="Notes product" multiline variant="outlined" fullWidth />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField label="Total" defaultValue="$ 5000" />
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
