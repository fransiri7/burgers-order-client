import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: red[700]
        },
        secondary: {
            light: grey[300],
            main: grey[500],
            dark: grey[900]
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
