import { React, useState } from "react";
import { Button, Grid, InputAdornment, Typography, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, green, red } from "@mui/material/colors";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { create } from "./utils/service";

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

export function CreateProduct() {
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
                const functionResponse = await create(formData);
                if (functionResponse.success) {
                    setFormData({
                        name: "",
                        description: "",
                        price: "",
                        hexColor: "ff0000"
                    });
                    alert(functionResponse.msg);
                    navigate("/");
                } else {
                    alert(functionResponse.msg);
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column" alignItems="center" style={{ height: "70vh", width: "90%" }}>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ height: "10%" }}>
                    <Grid item>
                        <Typography variant="h5" fontWeight="bold">
                            Create Product
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
                            <Button variant="contained" color="tertiary" style={{ color: "white" }} onClick={handleSubmit}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
