import React, { useEffect } from 'react';
import { Grid, Tooltip } from '@mui/material';
import TodayRecord from './TodayRecord';
import { Fragment } from 'react';
import VerticalChart from './VerticalChart';
import PieChart from './PieChart';
import { connect } from 'react-redux';
import { useState } from 'react';
import Loader from '../../Shared/common/Loader';
import "./styles/Dashboard.css"
import LoggedUserInfo from '../../Shared/common/LoggedUserInfo';
import DashboardTable from './DashboardTable';
import { getComplainGroupData } from '../../Shared/Api/api';
import DashboardCriticalComplain from "./DashboardCriticalComplain"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom"
function Dashboard({ auth }) {
  const [totalData, setTotalData] = useState(null)
  const [totalRasiedData, setTotalRasiedData] = useState([])
  const [totalInComplainData, setTotalInComplainData] = useState([])
  const [totalDoneData, setTotalDoneData] = useState([])
  const [totalBorderColor, setTotalBorderColod] = useState([])
  const [totalBackgroundColor, setTotalBackgroundColor] = useState([])
  const [dataChanged, setdataChanged] = useState(false)
  const [totalDepartments, setTotalDepartments] = useState([])
  const [loaded, setLoaded] = React.useState(true);
  let history = useHistory()
  useEffect(() => {
    const userId = localStorage.getItem("userID")
    if (userId) {
      getComplainGroupData(userId).then((res) => {
        res.length && res.forEach(datas => {
          let firstnumber = Math.floor(Math.random() * 256);
          let secondnumber = Math.floor(Math.random() * 256);
          let thirdnumber = Math.floor(Math.random() * 256);
          let backgroundColor = `rgba(${firstnumber}, ${secondnumber}, ${thirdnumber}, 0.8)`;
          let borderColor = `rgba(${firstnumber}, ${secondnumber}, ${thirdnumber}, 1)`;

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
          setTotalBackgroundColor((totalBackgroundColor) => [
            ...totalBackgroundColor,
            backgroundColor,
          ]);
          setTotalBorderColod((totalBorderColor) => [
            ...totalBorderColor,
            borderColor,
          ]);
          setTotalDepartments((totalDepartments) => [
            ...totalDepartments,
            datas.DepartmentName ? datas.DepartmentName : datas.DepartmentNam,
          ]);

        })
        setTotalData(res)
        setLoaded(false)
      })
    }

  }, [setLoaded, setTotalData]);
  const redirectTo = () => {
    history.push('/raise')
  }
  const showTotalRaised = totalRasiedData.filter(numbers => numbers !== 0).reduce((sum, data) => {
    return sum += data
  }, 0)
  const showTotalInProgress = totalInComplainData.filter(numbers => numbers !== 0).reduce((sum, data) => {
    return sum += data
  }, 0)
  const showTotalDone = totalDoneData.filter(numbers => numbers !== 0).reduce((sum, data) => {
    return sum += data
  }, 0)
  console.log(totalData)
  return loaded || !totalData ?
    (<Grid container px={12} style={{ height: "100%" }}>
      <Loader />
    </Grid>) : (
      <Fragment>

        {
          auth.user ?
            (<LoggedUserInfo auth={auth} />)
            :
            ""
        }
        {
          auth.user.UserRole === "Complainant" ?
            (<Grid container display="flex" justifyContent="flex-end" mx={8} py={2} >
              <Tooltip title="Raise Complain" placement="left">
                <Fab color="primary" aria-label="add" style={{ color: "#fff" }} onClick={redirectTo}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>)
            :
            ""
        }


        <Grid container display="flex" alignItems="flex-start" mb={3}>
          <Grid container pl={{ xs: 2, sm: 4, md: 8 }} pr={{ xs: 2, sm: 4, md: 0 }} item md={8}>

            {auth.user && (auth.user.UserRole === "Department Employee" || auth.user.UserRole === "SuperAdmin") ? (<DashboardCriticalComplain />
            ) : ""}

            <DashboardTable />
            <TodayRecord showTotalRaised={showTotalRaised} showTotalInProgress={showTotalInProgress} showTotalDone={showTotalDone} />
            <VerticalChart
              totalRasiedData={totalRasiedData}
              totalDepartments={totalDepartments}
              totalInComplainData={totalInComplainData}
              totalDoneData={totalDoneData}
            />
          </Grid>
          <PieChart totalRasiedData={totalRasiedData}
            showTotalRaised={showTotalRaised}
            showTotalInProgress={showTotalInProgress}
            showTotalDone={showTotalDone}
            totalInComplainData={totalInComplainData}
            totalDoneData={totalDoneData}
            totalBackgroundColor={totalBackgroundColor}
            totalBorderColor={totalBorderColor}
            totalDepartments={totalDepartments}
            auth={auth}
          />
        </Grid>
      </Fragment >
    );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);