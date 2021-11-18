import React, { useState } from "react"
import { Box, Grid, Button, Alert } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PanelHeader from '../../Shared/common/PanelHeader'
import { connect } from "react-redux";
import { mobileverifications } from "../../redux/actions/auth";
import OTPImages from "../../assets/otp.jpg"
const validationSchema = yup.object({
    OTP: yup
        .string('Enter your OTP')
        .required('OTP is required')
});
function MobileVerifications({ mobileverifications }) {
    const [error, setError] = useState("")
    const formik = useFormik({
        initialValues: {
            OTP: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (allValues) => {
            await new Promise((r) => setTimeout(mobileverifications(allValues)));
        },
    });
    return (
        <Grid item bgcolor="#fff" borderRadius="5px" boxShadow={3} xs={12} sm={8} my={12}>
            <PanelHeader title={"Mobile Verification "} />
            <Box>
                <Grid item container alignItems="stretch">
                    <Grid item md={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} alignItems="stretch">
                        <img src={OTPImages} width="100%" height="100%" />
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
                                        label="Enter OTP sent on your Mobile"
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
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default connect(null, { mobileverifications })(MobileVerifications);