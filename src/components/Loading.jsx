import { LinearProgress, Stack } from "@mui/material";

import React from "react";

export function Loading() {
    return (
        <Stack sx={{ width: "80%" }} spacing={2}>
            <LinearProgress style={{ marginTop: "200px", color: "inherit" }} />
        </Stack>
    );
}
