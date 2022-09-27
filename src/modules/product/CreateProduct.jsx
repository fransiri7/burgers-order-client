import { React, useState } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, green, red } from "@mui/material/colors";
import { ChromePicker } from "react-color";

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
    const [color, setColor] = useState("ff0000");
    const [input, setInput] = useState("");

    const handleChange = event => {
        setInput(event.target.value);
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column" alignItems="center" style={{ height: "80vh", width: "80%" }}>
                <Grid item container justifyContent="flex-start" alignItems="center" style={{ height: "10%" }}>
                    <Grid item>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
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
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    multiline
                                    value={input}
                                    onChange={handleChange}
                                    fullWidth
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
                                    value={input}
                                    onChange={handleChange}
                                    fullWidth
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
                            <Grid item md={12}>
                                <TextField
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    label="Price"
                                    value={input}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={5}>
                        <Grid item container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                            <Grid item>
                                <ChromePicker
                                    color={color}
                                    onChangeComplete={color => {
                                        setColor(color.hex);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container direction="row" justifyContent="center" alignContent="center" style={{ height: "10%" }}>
                    <Grid item container justifyContent="space-around" alignItems="center" md={4} style={{ height: "100%" }}>
                        <Grid item>
                            <Button variant="contained" color="secondary" style={{ color: "white" }}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="tertiary" style={{ color: "white" }}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
