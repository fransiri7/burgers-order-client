import React from "react";
import { Button, Grid, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";

export function CreateOrder() {
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
                    <TextField label="Name" variant="outlined" fullWidth />
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
                    <TextField label="Address" variant="outlined" fullWidth />
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
                    <TextField id="outlined-textarea" label="Order notes" multiline variant="outlined" fullWidth />
                </Grid>
            </Grid>

            <Grid item container direction="column" justifyContent="space-around" alignItems="center" spacing={2}>
                <Grid item container>
                    <Grid item md={8}>
                        <Select style={{ width: "96%" }}>
                            <MenuItem value={1}>American Burger</MenuItem>
                            <MenuItem value={2}>Bell Peper Cheese</MenuItem>
                            <MenuItem value={3}>Blue Cheese Burger</MenuItem>
                            <MenuItem value={4}>Capresse Burger</MenuItem>
                            <MenuItem value={5}>Cheese Bacon Burger</MenuItem>
                            <MenuItem value={6}>Kid Burger</MenuItem>
                            <MenuItem value={7}>Veggie Burger</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item md={1}>
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
                    <Grid item md={1}>
                        <TextField id="outlined-read-only-input" label="Sub-Total" defaultValue="$ 5000" />
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
                        <TextField id="outlined-textarea" label="Notes product" multiline variant="outlined" fullWidth />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField id="outlined-read-only-input" label="Total" defaultValue="$ 5000" />
                </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Grid item container md={2} justifyContent="space-between">
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
