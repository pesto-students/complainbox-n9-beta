import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid, Typography } from '@mui/material';
import { columns } from './TableData';
import moment from 'moment'
import PanelHeader from '../../Shared/common/PanelHeader';
import { getCriticalComplain } from "../../Shared/Api/api"
import { useHistory } from "react-router-dom"


function DashboardCriticalComplain({ auth }) {
    const [rows, setRows] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let history = useHistory()

    useEffect(() => {
        if (auth.user && auth.user.UserRole === "Department Employee") {
            getCriticalComplain('critical', auth.user.id, page, rowsPerPage).then((res) => {
                setRows(res);
            })
        }
        else if (auth.user && auth.user.UserRole === "SuperAdmin") {
            getCriticalComplain('critical', auth.user.id, page, rowsPerPage).then((res) => {
                setRows(res);
            })
        }

    }, [setRowsPerPage, setRows, auth.user, rowsPerPage, page]);

    const redirectToSingleComplain = (id) => {
        console.log(id)
        history.push(`complain-department-details/${id}`)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const toDateTime = (secs) => {
        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        t.setUTCSeconds(secs);
        return moment(t).format('MMMM Do YYYY, h:mm:ss a')
    }
    return (
        <Grid container mb={8}>
            <PanelHeader title={"Critical Complains"} />
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table aria-label="sticky table">
                        <TableHead>
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
                            {rows && rows.length > 0 ? rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={{ cursor: "pointer" }}>
                                            {columns.map((column) => {
                                                let columnValue = row.hasOwnProperty(column.id)
                                                const value = column.id === "CreatedAt" ? toDateTime(row[column.id]._seconds) : row[column.id]
                                                const id = row.id
                                                return (
                                                    <TableCell key={column.id} align={column.align} onClick={() => redirectToSingleComplain(row.id)}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }) : < TableRow style={{ textAlign: "center", padding: "20px" }}> No Data</TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <input type="number" name="rowss"></input> */}

                <TablePagination
                    rowsPerPageOptions={[3, 10, 25, 100, rows && rows.length ? rows.length : 0].sort((a, b) => a - b)}
                    component="div"
                    count={rows && rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid >
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(DashboardCriticalComplain);
