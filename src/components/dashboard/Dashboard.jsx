import { React, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FormatListNumberedSharpIcon from "@mui/icons-material/FormatListNumberedSharp";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "./Navbar";
import { ProductsList, CreateOrEditProduct } from "../../modules/product/";
import { Orders } from "../../modules/order/Orders";
import { Routes, Route, NavLink } from "react-router-dom";
import { Home } from "../../modules/home/Home";

const drawerWidth = 190;

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));

export function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const active = {
        color: theme.palette.primary.main,
        textDecoration: "none"
    };

    const inactive = {
        color: theme.palette.secondary.dark,
        textDecoration: "none"
    };

    const buildListItem = (itemName, icon, route) => {
        return (
            <NavLink end to={route} style={({ isActive }) => (isActive ? active : inactive)}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={itemName} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
        );
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {buildListItem("Home", <HomeIcon />, "/")}
                    <Divider />
                    {buildListItem("Products", <RestaurantIcon />, "/products")}
                    {buildListItem("Orders", <FormatListNumberedSharpIcon />, "/orders")}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductsList />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products/create" element={<CreateOrEditProduct />} />
                        <Route path="/products/edit/:id" element={<CreateOrEditProduct />} />
                    </Routes>
                </div>
            </Main>
        </Box>
    );
}
