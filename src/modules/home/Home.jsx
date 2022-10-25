import { React, useState } from "react";
import { Grid, TextField } from "@mui/material";
import moment from "moment/moment";
import { blue } from "@mui/material/colors";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useOrdersBySold } from "./utils/apiHooks";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export function Home() {
    const [date, setDate] = useState({ salesForMonths: moment().format("yyyy-MM") });
    const [orders] = useOrdersBySold(date.salesForMonths);

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    };

    const handleDatePickerChange = event => {
        event.preventDefault();
        setDate({ ...date, [event.target.name]: event.target.value });
    };

    const labels = orders.map(item => item.label);
    const scores = orders.map(item => item.total);

    const data = {
        datasets: [
            {
                label: "Last sales",
                data: scores,
                backgroundColor: `${blue[200]}`
            }
        ],
        labels
    };

    return (
        <Grid container direction="column" justifyContent="space-between" style={{ width: "65%" }}>
            <Grid item container alignItems="center" style={{ height: "10%" }}>
                <Grid item>
                    <TextField
                        name="salesForMonths"
                        label="Sales for months"
                        type="month"
                        value={date.salesForMonths}
                        onChange={handleDatePickerChange}
                    />
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" style={{ height: "85%" }}>
                <Grid item md={12}>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </Grid>
    );
}
