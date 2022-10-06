import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export function OrderCard() {
    return (
        <Card style={{ backgroundColor: "pink", border: "1px solid black", width: "100%", height: "220px", borderRadius: "10px" }}>
            <CardContent>soy una tarjeta</CardContent>
        </Card>
    );
}
