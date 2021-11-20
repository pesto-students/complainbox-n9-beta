import { Grid } from '@mui/material';
import React from 'react';
import PanelHeader from '../../Shared/common/PanelHeader';
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux"


const VerticalChart = ({ totalRasiedData, totalDepartments, totalInComplainData,
  totalDoneData }) => {

  const data = {
    labels: totalDepartments,
    datasets: [
      {
        label: 'Total Raise Complains',
        data: totalRasiedData,
        backgroundColor: 'rgb(66,63,249,.6)',
        stack: 'Stack 0',

      },
      {
        label: 'Total W ip Complains',
        data: totalInComplainData,
        backgroundColor: 'rgb(35,169,75,.6)',
        stack: 'Stack 1',

      },
      {
        label: 'Total Completed Complains',
        data: totalDoneData,
        backgroundColor: 'rgb(252,21,49,.6)',
        stack: 'Stack 2',

      },
    ],
  };
  const options = {
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      },
      x: {
        stacked: true
      }
    }
  };

  return (
    <Grid container mt={5} boxShadow={10} borderRadius="20px" >
      <PanelHeader title={"Statictics"} />
      <Grid container style={{ background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }} px={3} py={2}>
        <Bar data={data} options={options} style={{ fontWeight: "bolder" }} />
      </Grid>
    </Grid>
  )
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(VerticalChart);