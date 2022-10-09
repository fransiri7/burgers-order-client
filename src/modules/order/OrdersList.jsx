import React from "react";
import { OrderCard } from "./OrderCard";
import { Grid } from "@mui/material";

export function OrdersList() {
    const orders = [
        {
            id: 1,
            name: "Federico",
            address: "San Luis 150",
            status: false,
            notes: "esquina colombo, sobre san luis, puerta blanca",
            paymentMethod: "cash",
            deliveredBy: "Cadeteria",
            takeAway: false,
            totalPrice: 2400,
            time: "2022-10-05T22:10:52.563Z",
            products: [
                {
                    name: "American Classic Simple",
                    price: 650,
                    hexColor: "#83da45",
                    orderProduct: {
                        id: 1,
                        orderId: 1,
                        productId: 1,
                        quantity: 2,
                        subtotal: 1300,
                        notes: "una sin lechuga"
                    }
                },
                {
                    name: "American Classic Doble",
                    price: 1100,
                    hexColor: "#610e4d",
                    orderProduct: {
                        id: 2,
                        orderId: 1,
                        productId: 2,
                        quantity: 1,
                        subtotal: 1100,
                        notes: null
                    }
                }
            ]
        },
        {
            id: 2,
            name: "Francisco",
            address: "",
            status: false,
            notes: "lo paso a retirar onda 22 hs",
            paymentMethod: "transfer",
            deliveredBy: "",
            takeAway: true,
            totalPrice: 1800,
            time: "2022-10-05T22:15:17.535Z",
            products: [
                {
                    name: "Caprese Simple",
                    price: 600,
                    hexColor: "#2ca5d0",
                    orderProduct: {
                        id: 3,
                        orderId: 2,
                        productId: 7,
                        quantity: 1,
                        subtotal: 600,
                        notes: "podrian ponerle poquita albahaca por favor?, soy alergico"
                    }
                },
                {
                    name: "Classic Burger Simple",
                    price: 600,
                    hexColor: "#477871",
                    orderProduct: {
                        id: 4,
                        orderId: 2,
                        productId: 13,
                        quantity: 1,
                        subtotal: 600,
                        notes: null
                    }
                },
                {
                    name: "Cheesebacon Simple",
                    price: 600,
                    hexColor: "#901e1e",
                    orderProduct: {
                        id: 5,
                        orderId: 2,
                        productId: 9,
                        quantity: 1,
                        subtotal: 600,
                        notes: "sin cebolla caramelizada por favor!"
                    }
                }
            ]
        }
    ];

    return (
        <Grid container direction="column" justifyContent="space-between" style={{ backgroundColor: "blue", height: "80vh" }}>
            <Grid item alignItems="center" style={{ backgroundColor: "green", height: "10%" }}>
                ACA VAN A IR LOS SELECTS PARA FECHAS
            </Grid>
            <Grid item container style={{ backgroundColor: "pink", height: "85%", overflowY: "scroll" }}>
                {orders.map(order => {
                    return (
                        <Grid
                            key={order.id}
                            item
                            container
                            justifyContent="center"
                            md={4}
                            style={{ marginTop: "15px", marginBottom: "5px" }}
                        >
                            <Grid item md={11}>
                                <OrderCard order={order} />
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
}
