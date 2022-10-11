import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const drawerWidth = 190;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export function Navbar({ handleDrawerOpen, open }) {
    const navigate = useNavigate();
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                    <MenuIcon />
                </IconButton>

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <LunchDiningIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Burgers Order
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired
};
