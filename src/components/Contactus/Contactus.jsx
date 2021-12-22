import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import PanelHeader from "../../Shared/common/PanelHeader";

import Container from "@mui/material/Container";
function Contactus(props) {
  return (
    <Container fixed py={2}>
      <PanelHeader title={"Contact Us "} />
      <Box sx={{ bgcolor: "#ffffff" }}>
        <div style={{ color: "#1F5B88", padding: "10px" }}>
          <p>
            We are always available to listen you.
          </p>
          <p><b>Write Email to us:</b></p>
          <p>
            admin@ecomplainbox.com
          </p>
          <p><b>Our Toll Free Number is:</b></p>
          <p>+91-9999999999</p>
        </div>
      </Box>
    </Container>
  );
}

export default Contactus;
