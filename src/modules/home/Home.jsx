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
    const data = useMemo(function () {
        return {
            datasets: [{ label: "Last sales", data: scores, tension: 0.3, borderColor: "green", backgroundColor: "rgba(75,192,192,0.3)" }],
            labels
        };
    }, []);

    return (
        <Grid item container justifyContent="center">
            <Grid item style={{ height: "80vh" }}>
                <Bar data={data} options={options} style={{ height: "100%" }} />
            </Grid>
        </Grid>
    );
}
