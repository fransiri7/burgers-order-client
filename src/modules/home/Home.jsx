/* eslint-disable */
import { React, useMemo } from "react";
import { Grid } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const scores = [146, 204, 85, 92];
const labels = ["week 1", "week 2", "week 3", "week 4"];

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

export function Home() {
    const data = {
        datasets: [{ label: "Last sales", data: scores, tension: 0.3, borderColor: "green", backgroundColor: "rgba(75,192,192,0.3)" }],
        labels
    };

    return (
        <Grid container direction="column" justifyContent="space-between" style={{ width: "65%", backgroundColor: "red" }}>
            <Grid item container alignItems="center" style={{ backgroundColor: "green", height: "10%" }}>
                <Grid item>aca va a ir el date picker</Grid>
            </Grid>
            <Grid item container justifyContent="center" style={{ backgroundColor: "yellow", height: "85%" }}>
                <Grid item md={12} style={{ backgroundColor: "pink", backgroundPosition: "center center", backgroundSize: "cover" }}>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </Grid>
    );
}
