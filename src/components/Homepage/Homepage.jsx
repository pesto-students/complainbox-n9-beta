import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import picture from "../../assets/unnamed.png";
import HomeBackgroundImage from "../../assets/bg-home.jpeg";
import Wave1 from "../../assets/wave1.png"
import Wave2 from "../../assets/wave2.png"
import Wave3 from "../../assets/wave3.png"
import Typewriter from 'typewriter-effect';
import BannerImage from "../../assets/—Pngtree—contact us flat design style_5874427.png"
import "./styles/HomepageStyles.css";
import PanToolIcon from '@mui/icons-material/PanTool';

function Homepage(props) {
    return (
        <Grid container>
            <Grid container md={{ alignContent: 'center' }} style={{ backgroundImage: `url(${HomeBackgroundImage})`, backgroundSize: "100% auto", minHeight: "600px", position: "relative" }}>
                <Grid container className="overlay">
                    <Grid item md={6} sm={12} sx={12} py={5}
                        container
                        display="flex"
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h4" mr={2} mb={2}>E-complaint Box</Typography>
                        <Typography variant="h5">
                            <Typewriter
                                options={{
                                    strings: ['RAISE COMPLAINT', 'SEE CURRENT STATUS', 'SEE IF IT IS FINAL'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid container item md={6} sm={12} sx={12}
                        py={5}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src={BannerImage} alt="" width="100%" />
                    </Grid>

                    <div className="wave-effect wave-anim">
                        <div className="waves-shape shape-one">
                            <div className="wave wave-one" style={{ backgroundImage: `url(${Wave1})` }}>
                            </div>
                        </div>
                        <div className="waves-shape shape-two">
                            <div className="wave wave-two" style={{ backgroundImage: `url(${Wave2})` }}>
                            </div>
                        </div>
                        <div className="waves-shape shape-three">
                            <div className="wave wave-three" style={{ backgroundImage: `url(${Wave3})` }}>
                            </div>
                        </div>
                    </div>
                    <Grid>
                    </Grid>

                </Grid >
            </Grid >
            <Grid container md py={10} px={5} className="complain-steps">
                <Grid container>
                    <Typography style={{ width: "100%", fontWeight: "bold" }} variant="h4" align="center">
                        Raise your complaint in just 3 steps
                    </Typography>
                </Grid>
                <Grid container pt={5} style={{ textAlign: "center", fontWeight: "bold" }}>
                    <Grid item md={4} sm={4} xs={12} className="step-section">
                        <Box className="icon-box" boxShadow={10}>
                            <PersonAddIcon px={2} style={{ fontSize: "60px" }} />
                        </Box>
                        <Typography style={{ textAlign: "center", fontSize: "1.5em" }} my={2}>
                            Sign up & create your profile
                        </Typography>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="step-section">
                        <Box className="icon-box" boxShadow={10}>
                            <CheckCircleIcon px={2} style={{ fontSize: "60px" }} />
                        </Box>
                        <Typography style={{ textAlign: "center", fontSize: "1.5em" }} my={2}>
                            Verify your profile
                        </Typography>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="step-section">
                        <Box className="icon-box" boxShadow={10}>
                            <LibraryBooksIcon px={2} style={{ fontSize: "60px" }} />
                        </Box>
                        <Typography style={{ textAlign: "center", fontSize: "1.5em" }} my={2}>
                            Raise complaint & check feedback
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container py={5} px={5} bgcolor="#3AAFA9" style={{ color: "#fff", fontWeight: "bold" }}>
                <Grid container>
                    <Grid item md={4} sm={12} xs={12}>
                        <Box className="numberofcomplains">
                            <PanToolIcon px={2} style={{ fontSize: "100px" }} />
                            <Typography mt={4} >
                                200+
                            </Typography>
                            <Typography variant="h6">
                                Rasied
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <Box className="numberofcomplains">
                            <AutorenewIcon px={2} style={{ fontSize: "100px" }} />
                            <Typography mt={4}>
                                100+
                            </Typography>
                            <Typography variant="h6">
                                In Progress
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <Box className="numberofcomplains">
                            <AssignmentTurnedInIcon px={2} style={{ fontSize: "100px" }} />
                            <Typography mt={4}>
                                30+
                            </Typography>
                            <Typography variant="h6">
                                Completed
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={7} px={12} sm={12} xs={12} style={{ fontWeight: "semi-bold", display: "flex", alignItems: "center" }} py={4}>
                    <Typography style={{ fontWeight: "semi-bold", alignItems: "center", fontSize: "20px", fontStyle: "italic" }}>
E-Compaint Box is a government initiative under Digital India Program to solve all citizen’s problems under one umbrella. Where citizens can file complaints to any department from a common platform. Government of India has issued 350 million to provide a better experience in the 21st century.                    </Typography>
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <img src={picture} alt="" style={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Grid >
    );
}

export default Homepage;