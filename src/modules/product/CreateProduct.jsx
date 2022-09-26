import { React, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[700]
        },
        secondary: {
            light: grey[500],
            main: grey[500],
            dark: grey[900]
        }
    }
});

export function CreateProduct() {
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: "",
        hexColor: ""
    });

    const handleChange = event => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column" alignItems="center" style={{ height: "80vh" }}>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ height: "5%" }}>
                    <Grid item>
                        <Typography variant="body2">Create Product</Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    alignItems="center"
                    style={{
                        // backgroundColor: "green",
                        height: "15%",
                        width: "100%"
                    }}
                >
                    <Grid item>
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            label="Name"
                            multiline
                            value={input.name}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    alignItems="center"
                    style={{
                        // backgroundColor: "yellow",
                        height: "25%",
                        width: "100%"
                    }}
                >
                    <Grid item>
                        <TextField
                            id="description"
                            name="description"
                            type="text"
                            label="Description"
                            multiline
                            rows={3}
                            value={input.description}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid item container direction="row" justifyContent="space-between" style={{ height: "45%" }}>
                    <Grid item container alignItems="center" md={4} style={{ marginTop: "20px" }}>
                        <Grid item>
                            <TextField
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                label="Price"
                                value={input.price}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        //  style={{ backgroundColor: "grey" }}
                    >
                        <h1>tableta de colores</h1>
                    </Grid>
                </Grid>

                <Grid item container direction="row" justifyContent="center" alignContent="center" style={{ height: "10%" }}>
                    <Grid item container justifyContent="space-around" alignItems="center" md={3} style={{ height: "100%" }}>
                        <Grid item>
                            <Button variant="outlined">Back</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined">Create</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
