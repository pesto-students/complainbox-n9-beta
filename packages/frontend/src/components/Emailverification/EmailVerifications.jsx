import React, { useRef, useState } from "react"
import { Box, Grid, Typography, Button, Checkbox, Alert } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Link, useHistory } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from "../../contexts/AuthContext"
import * as yup from 'yup';
import PanelHeader from '../../Shared/common/PanelHeader'
import { connect } from "react-redux";
import { emailverifications } from "../../redux/actions/auth";
import EmailVerificationImage from "../../assets/EmailVerification.png";
const validationSchema = yup.object({
    OTP: yup
        .string('Enter your OTP')
        .required('OTP is required')
});
function EmailVerifications({emailverifications}) {
    const [error, setError] = useState("")
    const formik = useFormik({
        initialValues: {
            OTP: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (allValues) => {
            await new Promise((r) => setTimeout(emailverifications(allValues)));
        },
    });
    return (
        <Grid item bgcolor="#fff" borderRadius="5px" boxShadow={3} xs={12} sm={8} my={12}>
            <PanelHeader title={"Email Verification "} />
            <Box>
                <Grid item container alignItems="stretch">
                    <Grid item md={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} alignItems="stretch">
                        <img src={EmailVerificationImage} width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} px={2} container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            item
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Box item noValidate sx={{ mt: 1 }}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        color="primary"
                                        margin="normal"
                                        fullWidth
                                        id="OTP"
                                        label="Enter OTP sent on your email-address"
                                        name="OTP"
                                        value={formik.values.OTP}
                                        onChange={formik.handleChange}
                                        error={formik.touched.OTP && Boolean(formik.errors.OTP)}
                                        helperText={formik.touched.OTP && formik.errors.OTP}
                                        autoComplete="OTP"
                                        autoFocus
                                        variant="standard"
                                    />
                                    <Button style={{ color: "#fff" }}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send OTP
                                    </Button>
                                </form>
                                <Grid item container>
                                    <Grid item py={2}>
                                        <Link to="/register" variant="body2" style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>
                                            {"Send OTP Again"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default connect(null, { emailverifications })(EmailVerifications);