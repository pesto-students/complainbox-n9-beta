import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TodayRecord from './TodayRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import { columns, rowsData } from './TableData';
import StyledMenuHome from './StyledMenuHome';
import { Fragment } from 'react';
import VerticalChart from './VerticalChart';
import PieChart from './PieChart';
import { connect } from 'react-redux';
import { useState } from 'react';
import { getDashboardData } from "../../redux/actions/auth"
import Loader from '../../Shared/common/Loader';
import { useHistory } from "react-router-dom"

function Dashboard({ auth }) {
  const [rows, setRows] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = React.useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  let history = useHistory()
  useEffect(() => {
    if (auth.user && auth.user.UserRole === "Department") {
      getDashboardData(page, rowsPerPage, "department", auth.user.id).then((res) => {
        setRows(res);
        setLoaded(false)
      })
    } else if (auth.user && auth.user.UserRole === "Complainant") {
      getDashboardData(page, rowsPerPage, "complainant", auth.user.id).then((res) => {
        setRows(res);
        setLoaded(false)
      })
    } else {
      getDashboardData(page, rowsPerPage, null, null).then((res) => {
        setRows(res);
        setLoaded(false)
      })
    }

  }, [setRowsPerPage, setRows, auth.user]);

  const redirectToSingleComplain = (id) => {
    debugger
    console.log(auth.user.UserRole !== "Department")
    console.log(auth.user.UserRole !== "SuperAdmin")
    if (auth.user.UserRole !== "Department" && auth.user.UserRole !== "SuperAdmin") {
      history.push(`complain-details/${id}`)
    } else {
      history.push(`complain-department-details/${id}`)
    }
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);

    return t.toString();
  }
  return loaded ?
    (<Grid container px={12} mt={12} style={{ height: "100%" }}>
      <Loader />
    </Grid>) : (
      <Fragment>
        {auth.user ? (<Grid container mt={12} px={12}><Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Welcome {auth.user ? auth.user.FullName : ""}</Typography></Grid>
        ) : ""
        }

        <Grid container px={12} mt={12}>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} style={{ backgroundColor: "#2B7A78", color: "#fff", fontWeight: "bolder" }} md={{ flexGrow: 1 }}>
                      Today
                    </TableCell>
                    <TableCell colSpan={2} style={{ backgroundColor: "#2B7A78", color: "#fff" }} align="right">
                      <Box>
                        <Button
                          style={{ backgroundColor: "transparent", color: "#fff", fontWeight: "bold" }}
                          id="demo-customized-button"
                          aria-controls="demo-customized-menu"
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          Options
                        </Button>
                        <StyledMenuHome anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} handleClose={handleClose} />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        <Typography style={{ fontWeight: "bolder" }}>{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows && rows.length && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => redirectToSingleComplain(row.id)} style={{ cursor: "pointer" }}>
                          {columns.map((column) => {
                            let columnValue = row.hasOwnProperty(column.id)
                            const value = column.id === "CreatedAt" ? toDateTime(row[column.id]._seconds) : row[column.id]
                            const id = row.id
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 10, 25, 100]}
              component="div"
              count={rows && rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <TodayRecord />
        <VerticalChart />
        <PieChart />
      </Fragment >
    );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);