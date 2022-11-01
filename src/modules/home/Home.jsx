import { React, useState } from "react";
import { Grid, TextField } from "@mui/material";
import moment from "moment/moment";
import { blue } from "@mui/material/colors";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSoldQuantity } from "./utils/apiHooks";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export function Home() {
    const [date, setDate] = useState(moment().format("yyyy-MM"));
    const [soldQuantity] = useSoldQuantity(date);

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

    const labels = soldQuantity.map(item => item.label);
    const scores = soldQuantity.map(item => item.total);

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
        <Grid container direction="column" justifyContent="space-between" style={{ width: "65%", height: "80vh" }}>
            <Grid item container alignItems="center" style={{ height: "10%" }}>
                <Grid item>
                    <TextField
                        label="Sales for months"
                        type="month"
                        value={date}
                        onChange={e => {
                            setDate(e.target.value);
                        }}
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
