import React from "react";
import { Grid, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const response = [
    {
        label: "Week 1",
        total: 140
    },
    {
        label: "Week 2",
        total: 190
    },
    {
        label: "Week 3",
        total: 179
    },
    {
        label: "Week 4",
        total: 112
    }
];

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
    const labels = response.map(item => item.label);
    const scores = response.map(item => item.total);

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
                    <TextField name="salesForMonths" label="Sales for months" type="month" value="2022-10" />
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
