import { React, useState, useEffect } from "react";
import { Button, Grid, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAllProducts } from "../product/utils/apiHooks";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, editOrder } from "./utils/service";
import swAlert from "sweetalert2";
import { red } from "@mui/material/colors";
import { useOrderById } from "./utils/apiHooks";

export function CreateOrEditOrder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, getOrderCompleted] = useOrderById(id);
    const [products, getProductsCompleted] = useAllProducts();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        notes: "",
        paymentMethod: "cash",
        takeAway: false,
        totalPrice: 0,
        products: []
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (getProductsCompleted && !formData.products.length) {
            if (getOrderCompleted && order) {
                setFormData(order);
            } else {
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
        }
    }, [getProductsCompleted, getOrderCompleted]);

    const handleChange = (event, index) => {
        const newFormData = { ...formData };
        const indexIsNotValid = !(index >= 0);
        if (indexIsNotValid) {
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
        if (formSubmitted) {
            const formValidation = validate(formData);
            setErrors(formValidation);
        }
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

    const validate = form => {
        const errors = {};
        if (!form.name) {
            errors.name = "Name is required";
        }
        if (!form.takeAway && !form.address) {
            errors.address = "Address is required";
        }
        return errors;
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);
        const formValidation = validate(formData);
        setErrors(formValidation);
        if (!Object.keys(formValidation).length) {
            try {
                if (order) {
                    await editOrder(formData, id);
                } else {
                    await createOrder(formData);
                }
                navigate("/orders");
            } catch (error) {
                swAlert.fire({
                    title: "ERROR!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: `${red[500]}`
                });
            }
        }
    };

    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item container>
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        {order ? "Edit Order" : "Create Order"}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item md={8}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
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
                        error={!!errors.address}
                        helperText={errors.address}
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
                        <Grid item container justifyContent="space-between">
                            <Grid item md={6}>
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
                            <Grid item container md={3} justifyContent="center">
                                <Grid item md={5} style={{ marginRight: "2%" }}>
                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={product.quantity}
                                        name="quantity"
                                        onChange={event => handleChange(event, index)}
                                    />
                                </Grid>
                                <Grid item md={5} style={{ marginLeft: "2%" }}>
                                    <TextField
                                        label="Subtotal"
                                        value={product.subtotal}
                                        name="subtotal"
                                        onChange={event => handleChange(event, index)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container md={3} alignItems="center" justifyContent="flex-end">
                                <Grid item>
                                    <Button variant="outlined" onClick={addNewProduct} style={{ marginRight: "10px" }}>
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
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={handleSubmit}>
                            {order ? "Edit" : "Add"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
