import { React, useState } from "react";
import { OrderCard } from "./OrderCard";
import { Button, Grid, IconButton, Switch, TextField, Typography } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import moment from "moment/moment";

export function OrdersList() {
    const [isPeriod, setIsPeriod] = useState(false);
    const [date, setDate] = useState({
        dateFrom: moment().format("yyyy-MM-DD"),
        dateTo: moment().format("yyyy-MM-DD")
    });

    const handleDatePickersChange = event => {
        event.preventDefault();
        event.target.name === "dateFrom"
            ? setDate({ ...date, dateFrom: event.target.value })
            : setDate({ ...date, dateTo: event.target.value });
    };
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
            status: true,
            notes: "pasa a retirar 22 hs aprox!",
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
                        notes: "poquita albahaca, ES ALERGICO!!!"
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
        <Grid container direction="column" justifyContent="space-between" style={{ height: "80vh" }}>
            <Grid item container alignItems="center" style={{ height: "10%" }}>
                <Grid item container md={9} alignItems="center">
                    <Grid item container md={3} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Typography>Day</Typography>
                        </Grid>
                        <Grid item>
                            <Switch
                                checked={isPeriod}
                                onChange={() => {
                                    setIsPeriod(!isPeriod);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography>Period</Typography>
                        </Grid>
                    </Grid>
                    <Grid item style={{ marginRight: "1%" }}>
                        <TextField
                            name="dateFrom"
                            label="Date From"
                            type="date"
                            value={date.dateFrom}
                            sm={{ width: 220 }}
                            onChange={handleDatePickersChange}
                        />
                    </Grid>
                    {isPeriod ? (
                        <Grid item style={{ marginRight: "1%" }}>
                            <TextField
                                name="dateTo"
                                label="Date To"
                                type="date"
                                value={date.dateTo}
                                sm={{ width: 220 }}
                                onChange={handleDatePickersChange}
                            />
                        </Grid>
                    ) : null}

                    <Grid item>
                        <IconButton>
                            <SearchTwoToneIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container md={3} justifyContent="flex-end">
                    <Grid item style={{ marginRight: "10%" }}>
                        <Button variant="outlined">Add Order</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container style={{ height: "85%", overflowY: "scroll" }}>
                {orders.map(order => {
                    return (
                        <Grid
                            key={order.id}
                            item
                            container
                            justifyContent="center"
                            md={6}
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
