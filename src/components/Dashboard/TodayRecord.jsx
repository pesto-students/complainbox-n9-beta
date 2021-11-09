import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { recordUseStyles } from './styles/HomepageStyles';
import PanelHeader from '../../Shared/common/PanelHeader';
import { getComplainGroupData } from '../../redux/actions/auth';
import { connect } from "react-redux"

function TodayRecord({ auth }) {
    const [totalData, setTotalData] = useState([])
    const [totalRasiedData, setTotalRasiedData] = useState([])
    const [totalInComplainData, setTotalInComplainData] = useState([])
    const [totalDoneData, setTotalDoneData] = useState([])
    const [dataChanged, setdataChanged] = useState(false)
    const [totalDepartments, setTotalDepartments] = useState([])
    useEffect(() => {
        if (auth.user) {
            getComplainGroupData(auth.user.id).then((res) => {
                setTotalData(res)
                res.length && res.map(datas => {
                    setTotalRasiedData((totalRasiedData) => [
                        ...totalRasiedData,
                        datas.totalRaiseComplains,
                    ]);
                    setTotalInComplainData((totalInComplainData) => [
                        ...totalInComplainData,
                        datas.totalWipComplains,
                    ]);
                    setTotalDoneData((totalDoneData) => [
                        ...totalDoneData,
                        datas.totalCompletedComplains,
                    ]);
                    setTotalDepartments((totalDepartments) => [
                        ...totalDepartments,
                        datas.DepartmentName ? datas.DepartmentName : datas.DepartmentNam,
                    ]);
                })

            })
        }

    }, [setTotalData, auth.user]);
    const showTotalRaised = totalRasiedData.reduce((sum, data) => {
        return sum += data
    }, 0)
    const showTotalInProgress = totalInComplainData.reduce((sum, data) => {
        return sum += data
    }, 0)
    const showTotalDone = totalDoneData.reduce((sum, data) => {

        return sum += data
    }, 0)




    const classes = recordUseStyles();

    return (
        <Grid container px={12} pt={8}>
            <PanelHeader title={"Statictics"} />
            <Grid
                py={4}
                container
                className={classes.grid}
                style={{ backgroundColor: "#fff" }}
            >
                <Box className={classes.numbers} style={{ color: "rgba(66,63,249,.6)" }}>
                    <FlagIcon px={2} style={{ fontSize: "45px" }} />
                    {showTotalRaised}
                    <Typography fontSize="20px" style={{ color: "rgba(0,0,0,.6)" }}>
                        Raised
                    </Typography>
                </Box>
                <Box className={classes.numbers} style={{ color: "rgba(35,169,75,.6)" }}>
                    <HourglassFullIcon px={2} style={{ fontSize: "45px" }} />
                    {showTotalInProgress}
                    <Typography fontSize="20px" style={{ color: "rgba(0,0,0,.6)" }}>
                        In Progress
                    </Typography>
                </Box>

                <Box className={classes.numbers} style={{ color: "rgba(252,21,49,.6)" }}>
                    <CheckCircleIcon px={2} style={{ fontSize: "45px" }} />
                    {showTotalDone}
                    <Typography fontSize="20px" style={{ color: "rgba(0,0,0,.6)" }}>
                        Completed
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(TodayRecord);