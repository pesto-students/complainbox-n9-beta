import React from 'react';
import { Box, Grid, Typography } from "@mui/material";

function PanelHeader({ title }) {
    return (
        <Grid container py={2} bgcolor={title === "Critical Complains" ? "#c16363" : "#2B7A78"} style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
            <Typography variant="h5" component="h5" px={2} style={title === "Critical Complains" ? { color: 'white' } : { color: "white" }}
            >
                {title}
            </Typography>
        </Grid >
    );
}

export default PanelHeader;