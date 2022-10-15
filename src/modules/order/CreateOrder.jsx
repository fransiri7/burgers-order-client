import React from "react";
import { Grid, Select, Switch, TextField, Typography, MenuItem, Button } from "@mui/material";

export function CreateOrder() {
    return (
        <Grid container direction="column" justifyContent="space-around" alignItems="center">
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item md={6}>
                    <TextField label="Name" variant="outlined" style={{ width: "80%" }}></TextField>
                </Grid>
                <Grid item container md={4}>
                    <Grid item>
                        <Typography variant="h6">Cash</Typography>
                    </Grid>
                    <Grid item>
                        <Switch />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container alignItems="center" justifyContent="center">
                <Grid item md={6}>
                    <TextField label="Direction" variant="outlined" style={{ width: "80%" }}></TextField>
                </Grid>
                <Grid item container md={4}>
                    <Grid item>
                        <Typography variant="h6">Take Away</Typography>
                    </Grid>
                    <Grid item>
                        <Switch />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container alignItems="center" justifyContent="center">
                <Grid item md={10}>
                    <TextField id="outlined-textarea" label="Notes" multiline variant="outlined" style={{ width: "80%" }}></TextField>
                </Grid>
            </Grid>

            <Grid item container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item container md={10}>
                    <Grid item md={6}>
                        <TextField label="Name of product" variant="outlined" style={{ width: "100%" }}></TextField>
                    </Grid>
                    <Grid item md={0.5}>
                        <Select>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item md={1.5}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Sub-Total"
                            defaultValue="$ 5000"
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item container md={2} alignItems="center" justifyContent="center" spacing={1}>
                        <Grid item>
                            <Button variant="outlined" style={{ width: "70%" }}>
                                +
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" style={{ width: "70%" }}>
                                -
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" justifyContent="center">
                    <Grid item md={10}>
                        <TextField
                            id="outlined-textarea"
                            label="Notes product"
                            multiline
                            variant="outlined"
                            style={{ width: "80%" }}
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField
                        id="outlined-read-only-input"
                        label="Total"
                        defaultValue="$ 5000"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item container md={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <Button variant="outlined" style={{ width: "70%" }} size="large">
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" style={{ width: "70%" }} size="large">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
