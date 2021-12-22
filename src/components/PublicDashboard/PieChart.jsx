import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import PanelHeader from '../../Shared/common/PanelHeader';
import { connect } from "react-redux"
import Loader from '../../Shared/common/Loader';
import { Fragment } from 'react';

const PieChart = ({ auth, showTotalDone, showTotalInProgress, showTotalRaised, totalRasiedData, totalInComplainData, totalDoneData, totalBackgroundColor, totalBorderColor, totalDepartments }) => {

  const data1 = {
    labels: totalDepartments,
    datasets: [
      {
        label: '# of Total raised complaints',
        data: totalRasiedData,
        backgroundColor: totalBackgroundColor,
        borderColor: totalBorderColor,
        borderWidth: 1,
      },
    ],
  };


  const data2 = {
    labels: totalDepartments,
    datasets: [
      {
        label: '# of Total In Progress complaint',
        data: totalInComplainData,
        backgroundColor: totalBackgroundColor,
        borderColor: totalBorderColor,
        borderWidth: 1,
      },
    ],
  };



  const data3 = {
    labels: totalDepartments,
    datasets: [
      {
        label: '# of Total In Progress complaints',
        data: totalDoneData,
        backgroundColor: totalBackgroundColor,
        borderColor: totalBorderColor,
        borderWidth: 1,
      },
    ],
  };

  const data4 = {
    labels: ["Raise", "In Progress", "Completed"],
    datasets: [
      {
        label: '# Status Of All Complaints',
        data: [showTotalRaised, showTotalInProgress, showTotalDone],
        backgroundColor: [
          "rgb(66, 63, 249, .6)",
          "rgb(35, 169, 75, .6)",
          "rgb(252, 21, 49, .6)"
        ],
        borderColor: [
          "rgb(66, 63, 249, 1)",
          "rgb(35, 169, 75, 1)",
          "rgb(252, 21, 49, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Grid container item md={4} px={{ xs: 2, sm: 4, md: 8 }}>
      {auth.user.UserRole !== "Department Employee" ?
        (
          <Fragment>
            <Grid container item boxShadow={10} borderRadius="20px" mt={{ xs: 5, sm: 5, md: 0 }}>
              <PanelHeader title={"Raised Complaints"} />
              <Grid container py={4} style={{ display: "flex", justifyContent: "center", background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                {showTotalRaised === null || showTotalRaised === 'undefined' ?
                  (
                    <Grid container px={12} my={12} >
                      <Loader />
                    </Grid>
                  ) :
                  showTotalRaised === 0
                    ?
                    <Typography variant="subtitle1" style={{ textAlign: "center" }} align="center">No Data To Show</Typography>
                    :
                    <Pie data={data1} style={{ width: "100%", maxHeight: "400px", fontWeight: "bolder" }} />
                }
              </Grid>
            </Grid>
            <Grid container item boxShadow={10} borderRadius="20px" mt={{ xs: 5, sm: 5, md: 5 }}>
              <PanelHeader title={"In Progress Complaints"} />
              <Grid container py={4} style={{ display: "flex", justifyContent: "center", background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                {showTotalInProgress === null || showTotalInProgress === 'undefined' ?
                  (
                    <Grid container px={12} my={12} >
                      <Loader />
                    </Grid>
                  ) : showTotalInProgress === 0 ?
                    <Typography variant="subtitle1" style={{ textAlign: "center" }} align="center">No Data To Show</Typography>
                    :
                    <Pie data={data2} style={{ width: "100%", maxHeight: "400px", fontWeight: "bolder" }} />
                }
              </Grid>
            </Grid>
            <Grid container item boxShadow={10} borderRadius="20px" mt={{ xs: 5, sm: 5, md: 5 }}>
              <PanelHeader title={"Completed Complaints"} />
              <Grid container py={4} style={{ display: "flex", justifyContent: "center", background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                {showTotalDone === null || showTotalDone === 'undefined' ?
                  (
                    <Grid container px={12} my={12} >
                      <Loader />
                    </Grid>
                  ) : showTotalDone === 0 ?
                    <Typography variant="subtitle1" style={{ textAlign: "center" }} align="center">No Data To Show</Typography>
                    :
                    <Pie data={data3} style={{ width: "100%", maxHeight: "400px", fontWeight: "bolder" }} />
                }
              </Grid>
            </Grid>
          </Fragment>
        ) :
        (
          <Grid container item boxShadow={10} borderRadius="20px" mt={{ xs: 5, sm: 5, md: 0 }}>
            <PanelHeader title={"All Complaints"} />
            <Grid container py={4} style={{ display: "flex", justifyContent: "center", background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
              {showTotalDone === null || showTotalDone === 'undefined' ?
                (
                  <Grid container px={12} my={12} >
                    <Loader />
                  </Grid>
                ) : showTotalDone === 0 ?
                  <Typography variant="subtitle1" style={{ textAlign: "center" }} align="center">No Data To Show</Typography>
                  :
                  <Pie data={data4} style={{ width: "100%", maxHeight: "400px", fontWeight: "bolder" }} />
              }
            </Grid>
          </Grid>
        )

      }



    </Grid>

  )
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PieChart);