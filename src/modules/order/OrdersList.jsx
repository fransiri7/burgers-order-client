import { React, useState } from "react";
import { OrderCard } from "./OrderCard";
import { Button, Grid, Switch, TextField, Typography } from "@mui/material";
import moment from "moment/moment";
import { useAllOrders } from "./utils/apiHooks";
import { Loading } from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

export function OrdersList() {
    const navigate = useNavigate();
    const [isPeriod, setIsPeriod] = useState(false);
    const [date, setDate] = useState({
        dateFrom: moment().format("yyyy-MM-DD"),
        dateTo: null
    });
    const [orders, setOrders, getOrderCompleted] = useAllOrders(date.dateFrom, date.dateTo);

    const handleDatePickerChange = event => {
        event.preventDefault();
        setDate({ ...date, [event.target.name]: event.target.value });
    };

    if (!getOrderCompleted) {
        return <Loading />;
    }

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
                                onChange={event => {
                                    setIsPeriod(event.target.checked);
                                    if (event.target.checked) {
                                        setDate({ ...date, dateTo: moment().format("yyyy-MM-DD") });
                                    } else {
                                        setDate({ ...date, dateTo: null });
                                    }
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
                            onChange={handleDatePickerChange}
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
                                onChange={handleDatePickerChange}
                            />
                        </Grid>
                    ) : null}
                </Grid>
                <Grid item container md={3} justifyContent="flex-end">
                    <Grid item style={{ marginRight: "10%" }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate("/orders/create");
                            }}
                        >
                            Add Order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container style={{ height: "85%", overflowY: "scroll" }}>
                {orders.map(order => (
                    <Grid key={order.id} item container justifyContent="center" md={6} style={{ marginTop: "15px", marginBottom: "5px" }}>
                        <Grid item md={11}>
                            <OrderCard order={order} setOrders={setOrders} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
