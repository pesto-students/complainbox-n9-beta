import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function Loader() {
    return (
        <Grid container
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <CircularProgress />
        </Grid>
    );
}