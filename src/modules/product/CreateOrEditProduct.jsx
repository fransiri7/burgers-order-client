import { React, useState, useEffect } from "react";
import { Button, Grid, InputAdornment, LinearProgress, Stack, Typography, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, green, red } from "@mui/material/colors";
import { ChromePicker } from "react-color";
import { useNavigate, useParams } from "react-router-dom";
import { create, editProduct } from "./utils/service";
import swAlert from "sweetalert2";
import { useProductById } from "./utils/apiHooks";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[700]
        },
        secondary: {
            main: red[500]
        },
        tertiary: {
            main: green[500]
        }
    }
});

export function CreateOrEditProduct() {
    const formatName = name =>
        name
            .trim()
            .split(" ")
            .map(character => character[0].toUpperCase() + character.slice(1))
            .join(" ");

    const validate = form => {
        const errors = {};
        if (!form.name) {
            errors.name = "Name is required";
        }
        if (!form.price) {
            errors.price = "Price is required";
        } else if (form.price < 0) {
            errors.price = "Price must be a number greater than 0";
        }
        return errors;
    };
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        hexColor: "ff0000"
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { id } = useParams();
    const [product, getProductCompleted] = useProductById(id);

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = event => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        if (formSubmitted) {
            setErrors(
                validate({
                    ...formData,
                    [event.target.name]: event.target.value
                })
            );
        }
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);
        const formValidation = validate(formData);
        setErrors(formValidation);
        if (Object.keys(formValidation).length === 0) {
            try {
                const body = {
                    ...formData,
                    name: formatName(formData.name)
                };
                let msg;
                if (!product) {
                    msg = await create(body);
                } else {
                    msg = await editProduct(body, id);
                }
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    hexColor: "ff0000"
                });
                swAlert
                    .fire({
                        title: "SUCCES!",
                        text: msg,
                        icon: "success",
                        confirmButtonColor: `${green[500]}`
                    })
                    .then(result => {
                        if (result.isConfirmed) {
                            navigate("/");
                        }
                    });
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

    if (!getProductCompleted) {
        return (
            <Stack sx={{ width: "80%" }} spacing={2}>
                <LinearProgress style={{ marginTop: "200px", color: "inherit" }} />
            </Stack>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column" alignItems="center" style={{ height: "70vh", width: "90%" }}>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ height: "10%" }}>
                    <Grid item>
                        <Typography variant="h5" fontWeight="bold">
                            {product ? "Edit Product" : "Create Product"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container style={{ height: "80%" }}>
                    <Grid item container justifyContent="center" direction="column" md={7}>
                        <Grid
                            item
                            container
                            alignItems="center"
                            style={{
                                height: "15%",
                                width: "100%"
                            }}
                        >
                            <Grid item md={12}>
                                <TextField
                                    error={!!errors.name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    multiline
                                    rows={1}
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            alignItems="center"
                            style={{
                                height: "50%",
                                width: "100%"
                            }}
                        >
                            <Grid item md={12}>
                                <TextField
                                    id="description"
                                    name="description"
                                    type="text"
                                    label="Description"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.description}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            alignItems="center"
                            style={{
                                height: "15%",
                                width: "100%"
                            }}
                        >
                            <Grid item md={4}>
                                <TextField
                                    error={!!errors.price}
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    label="Price"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    onChange={handleChange}
                                    value={formData.price}
                                    helperText={errors.price}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center" alignItems="center" style={{ height: "100%" }} md={5}>
                        <Grid item>
                            <ChromePicker
                                color={formData.hexColor}
                                onChangeComplete={color => {
                                    setFormData({ ...formData, hexColor: color.hex });
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction="row" justifyContent="center" alignContent="center" style={{ height: "10%" }}>
                    <Grid item container justifyContent="space-around" alignItems="center" md={4} style={{ height: "100%" }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ color: "white" }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item>
                            {product ? (
                                <Button variant="contained" color="tertiary" style={{ color: "white" }} onClick={handleSubmit}>
                                    Edit
                                </Button>
                            ) : (
                                <Button variant="contained" color="tertiary" style={{ color: "white" }} onClick={handleSubmit}>
                                    Create
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
