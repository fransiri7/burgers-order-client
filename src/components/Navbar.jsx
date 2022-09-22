import * as React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Paper } from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

export default function Navbar() {
    return (
        <Paper elevation={5}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <LunchDiningIcon />
                        </IconButton>
                        <Typography variant="h5" color="inherit" component="div">
                            Burgers Order
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Paper>
    );
}
