import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import './styles/styles.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Clock from 'react-live-clock';
import moment from 'react-moment'

export default function LoggedUserInfo({ auth }) {
    return (
        <Grid container mx={{ xs: 2, sm: 4, md: 8 }}>
            <Grid item md={12} sm={12} xs={12} my={12} py={5} className="avatar-container" boxShadow={8} borderRadius="20px">
                <Stack direction="row" spacing={2} className="avatar" sx={{ left: { xs: '35%', sm: '40%', md: '45%' } }}>
                    <Avatar
                        sx={{ width: 100, height: 100, bgcolor: "#3aafa8" }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    >
                        {auth.user.FullName.charAt(0).toString().toUpperCase()}
                    </Avatar>
                </Stack>
                <Grid container item md={12}>
                    <Grid item md={6} sm={12} xs={12}>
                        <Grid container ml={3}>
                            <Typography>
                                <span>
                                    Logged in as
                                </span>
                                <b> {auth.user.FullName}</b>
                            </Typography>
                        </Grid>
                        <Grid container ml={3}>
                            <Typography mt={3}>
                                <b>Role: </b>
                                <span>
                                    {auth.user.UserRole}
                                </span>
                            </Typography>
                        </Grid>
                        <Grid container ml={3}>
                            <Typography>
                                <Typography>
                                    <b>Email: </b>
                                    <span>
                                        {auth.user.Email}
                                    </span>
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid container ml={3}>
                            <Typography>
                                <Typography>
                                    <b>Contact: </b>
                                    <span>
                                        {auth.user.Mobile}
                                    </span>
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} px={3}>
                        <Grid item sx={{ textAlign: { xs: 'left', sm: 'left', md: 'right' } }} style={{ fontWeight: "bold", fontSize: "20px", color: "#3AAFA7" }}>
                            <Clock style={{ textShadow: "2px 2px 3px #eee" }}
                                date={new Date().now}
                                format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
                                ticking={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
}