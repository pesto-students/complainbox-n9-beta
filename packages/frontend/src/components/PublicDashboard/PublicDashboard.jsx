import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
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
import { publicComplain, getComplainGroupData, getPublicComplainGroupData } from '../../Shared/Api/api';

function PublicDashboard({ auth }) {
  const [totalData, setTotalData] = useState(null)
  const [totalRasiedData, setTotalRasiedData] = useState([])
  const [totalInComplainData, setTotalInComplainData] = useState([])
  const [totalDoneData, setTotalDoneData] = useState([])
  const [totalBorderColor, setTotalBorderColod] = useState([])
  const [totalBackgroundColor, setTotalBackgroundColor] = useState([])
  const [dataChanged, setdataChanged] = useState(false)
  const [totalDepartments, setTotalDepartments] = useState([])
  const [loaded, setLoaded] = React.useState(true);
  useEffect(() => {
    const userId = localStorage.getItem("userID")
    if (userId) {
      getPublicComplainGroupData(userId).then((res) => {
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

        {/* {auth.user ? (<Grid container mt={12} pl={{ xs: 2, sm: 4, md: 8 }}><Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Welcome {auth.user ? auth.user.FullName : ""}</Typography></Grid>
        ) : ""
        } */}
        <Grid container display="flex" alignItems="flex-start" mb={3}>
          <Grid container pl={{ xs: 2, sm: 4, md: 8 }} pr={{ xs: 2, sm: 4, md: 0 }} item md={8}>
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
export default connect(mapStateToProps)(PublicDashboard);