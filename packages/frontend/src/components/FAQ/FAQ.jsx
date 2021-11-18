import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import PanelHeader from "../../Shared/common/PanelHeader";
import { FAQAnswers } from "./FAQanswers";
function FAQ(props) {
    return (
        <Grid container mx={{ xs: 2, sm: 10, md: 36 }} boxShadow={8} my={30} borderRadius="20px">
            <PanelHeader title={"FAQ"} />
            {FAQAnswers.map((faq, i) => (
                <Grid item container sx={{ bgcolor: "#ffffff" }} display="flex" direction="column" px key={i} px={3} py={(FAQAnswers.length - 1) === i ? 3 : 0}>
                    <Typography variant="h5" my={2}>
                        {faq.question}
                    </Typography>
                    <Typography variant="subtitle1">
                        {faq.answer}
                    </Typography>
                </Grid>
            ))}

        </Grid>
    );
}

export default FAQ;
