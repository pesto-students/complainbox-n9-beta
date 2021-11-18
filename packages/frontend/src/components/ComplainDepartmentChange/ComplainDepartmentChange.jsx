import { Box, Grid, Typography, Button } from '@mui/material';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { FormHelperText } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Public from '@mui/icons-material/Public';
import Subject from '@mui/icons-material/Subject';
import { getSingleComplainData, updateComplainStatus, createComment, departmentChange } from '../../Shared/Api/api';
import { useHistory, useParams } from "react-router-dom"
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import moment from 'moment'
import LoggedUserInfo from '../../Shared/common/LoggedUserInfo';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import Loader from '../../Shared/common/Loader';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import MenuItem from '@mui/material/MenuItem';
import CreateIcon from '@mui/icons-material/Create';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { saveAs } from 'file-saver'


function ComplainDepartmentChange({ auth }) {
    const [description, setDescription] = useState("");
    const [complainStatus, setComplainStatus] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const editorRef = useRef(null);
    const [department, setDepartment] = useState("");
    let history = useHistory()

    const [complainData, setComplainData] = useState(null)
    let { id } = useParams()
    const [loader, setLoader] = useState(true)

    useEffect(async () => {
        const data = getSingleComplainData(id)
            .then(res => {
                setComplainData(res)
                setLoader(false)
            })
    }, [setComplainData, loader]);

    const downloadImage = (url) => {
        var element = document.createElement("a");

        var file = new Blob(
            [
                url
            ],
            { type: "image/*" }
        );
        window.URL.createObjectURL(new Blob([url]));
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
        // saveAs(url, 'image.jpg') // Put your image url here.
    }

    const parseEditorData = (content) => {
        let textContent = editorRef.current.getContent({ format: 'text' })
        if (textContent !== "" && textContent !== "undefined") {
            setDescription({ description: content });
            setDescriptionError("")
        } else {
            setDescriptionError("Comment field can not be empty")
        }
        console.log(descriptionError);
    }
    const handleChangeStatus = (e) => {
        setComplainStatus({ complainStatus: e.target.value })
    }
    const handleSubmitStatus = (e) => {
        updateComplainStatus(complainStatus.complainStatus, auth.user.id, id)
        //pass it in api
    }
    const handleClick = () => {
        setLoader(true);
        let textContent = editorRef.current.getContent({ format: 'text' })
        if (textContent !== "" && textContent !== "undefined") {
            setDescription({ description: editorRef.current.getContent() });
            setDescriptionError("");
            console.log(description)
            createComment(description.description, auth.user.id, id).then(res => {
                setLoader(false)
            });
        } else {
            setDescriptionError("Comment field can not be empty")
        }
    }

    const redirectToComplainUpdatePage = () => {
        history.push(`/update/${id}`)
    }

    const handleSubmitForward = (e) => {
        departmentChange(department, complainData.ComplainStatus, auth.user.id, history, id)
    }
    const handleChangeDepartment = (e) => {
        setDepartment({ department: e.target.value })
    }

    const toDateTimeBig = (secs) => {
        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        t.setUTCSeconds(secs);
        return moment(t).format('MMMM Do YYYY, h:mm:ss a')
    }
    const toDateTime = (secs) => {
        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        t.setUTCSeconds(secs);
        const d = new Date("2015-03-25");
        let newDate = moment(t).fromNow()
        return newDate;
    }

    return loader || !complainData || !auth.user ? (<Grid container px={12} mt={12} style={{ height: "100%" }}>
        <Loader />
    </Grid>) : (
        <Grid container >
            <LoggedUserInfo auth={auth} />
            {auth.user.UserDepartmentId === complainData.ComplainDepartmentID && auth.user.UserRole === "Department Employee" ? (<Fragment>
                <Grid item container py={4} px={{ xs: 2, sm: 4, md: 8 }}>
                    <Grid item >
                        <FormControl component="fieldset">
                            <RadioGroup size="large"
                                row aria-label="gender" name="row-radio-buttons-group" name="severity" onChange={handleChangeStatus} value={complainStatus.complainStatus || complainData.ComplainStatus}>
                                <FormLabel component="legend" name="severity"></FormLabel>
                                <FormControlLabel value="Raise" control={<Radio />} label="Raised" />
                                <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
                                <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" size="large" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff" }} onClick={handleSubmitStatus}>
                            Change the status
                        </Button>
                    </Grid>
                </Grid>

                <Grid item container pb={4} px={{ xs: 2, sm: 4, md: 8 }}>
                    <Grid container item md={6} sm={11} xs={12} display="flex" direction="row" alignItems="center" pr={2} pt={1}>
                        <TextField
                            ml={1}
                            variant="outlined"
                            name="department"
                            id="department"
                            select
                            fullWidth
                            value={department.department || complainData.ComplainDepartmentID}
                            label="Forward to the department"
                            onChange={handleChangeDepartment}
                        >

                            <MenuItem value={'6VrJzEXTR7WHBulqNDWP'}>Minority Welfare</MenuItem>
                            <MenuItem value={'Gb3z3ZQCLhKjD7pzgNZP'}>Agriculture</MenuItem>
                            <MenuItem value={'CBBIARsd1YKnkxD23P5V'}>Commecial Tax</MenuItem>

                            <MenuItem value={'JxWoAzlKXQWMFwJf4lbE'}>Women & Child Caree</MenuItem>
                            <MenuItem value={'Oxf0szUJ7pSeuoDfPsZi'}>Mines</MenuItem>
                            <MenuItem value={'WB1ae51Oqmj5NWr2iPZ5'}>Healthx</MenuItem>

                            <MenuItem value={'WfVCykHbeym4z5tDOkTv'}>Police</MenuItem>
                            <MenuItem value={'eIdRA3fc4DjWQExyuTnP'}>Backward Welfare</MenuItem>
                            <MenuItem value={'hRLEQdeY7i9Q04AGEllW'}>Electricity</MenuItem>

                            <MenuItem value={'kIzRUuKsMD4I8TWSnOOF'}>Road & Transportation</MenuItem>
                            <MenuItem value={'nsgvszjIilWddwNmFsHy'}>Technical Education</MenuItem>
                            <MenuItem value={'nwSV5YsEQXmYbOtBodPx'}>Primary Education</MenuItem>

                            <MenuItem value={'wPxaRdNrieG7BJbOOUNm'}>Excise</MenuItem>
                            <MenuItem value={'wcyuQ8BHs5yKJKNPr2Ls'}>Election</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid container item md={6} sm={12} xs={12} pt={{ xs: 4, sm: 3, md: 1 }}>
                        <Button variant="contained" size="large" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff" }} onClick={handleSubmitForward}>
                            Forward Complain
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>) : ""}



            {auth.user.id === complainData.ComplainUserID && auth.user.UserRole === "Complainant" ? (<Grid container item md={6} sm={12} xs={12} pt={4} my={2} px={{ xs: 2, sm: 4, md: 8 }}>
                <Button startIcon={<CreateIcon />} variant="contained" size="large" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff" }} onClick={redirectToComplainUpdatePage}>
                    Edit Complain
                </Button>
            </Grid>) : ""}

            <Grid container display="flex" justifyContent="center" alignItems="flex-start">
                <Grid container item px={{ xs: 2, sm: 4, md: 8 }} mb={0} md={12} sm={12} xs={12}>
                    <Grid container style={{ background: "#fff", color: "#1F5B88" }} py={3} px={3} mt={1} boxShadow={8} borderRadius="20px">
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <DateRangeIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Date: </b> {toDateTimeBig(complainData.CreatedAt._seconds)}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <WarningAmberIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Complain Type: </b> {complainData.ComplainType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <PausePresentationIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Complain Status: </b> {complainData.ComplainStatus}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <FlashAutoIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Severity: </b> {complainData.ComplainSeverity}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <WorkOutline style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Department: </b> {complainData.department.DepartmentName ? complainData.department.DepartmentName : complainData.department.DepartmentNam}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <Public style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>City: </b> {complainData.city.CityName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <PermIdentityIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Complainer: </b> {complainData.user.FullName}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <PermPhoneMsgIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Mobile: </b> {complainData.user.Mobile}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <Subject style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Subject Line: </b> {complainData.ComplainSubject}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12} pt={4}>
                                <Typography variant="subtitle1" style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-flex'
                                }}>
                                    <FormatTextdirectionLToRIcon style={{ marginRight: "10px " }} /> <b style={{ marginRight: "10px " }}>Description: </b>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container pl={4}>
                            {ReactHtmlParser(complainData.ComplainDescription)}
                        </Grid>

                        {complainData && complainData.ComplainDocument && Array.isArray(complainData.ComplainDocument.ComplainDocumentPath) && complainData.ComplainDocument.ComplainDocumentPath.map((document, i) => {
                            return (
                                <Grid item container direction="row" alignItems="center" md={12} key={i}>
                                    <Grid item md={12} sm={12} xs={12} pt={4}>
                                        <Typography variant="subtitle1" style={{
                                            verticalAlign: 'middle',
                                            display: 'inline-flex'
                                        }}>
                                            <b style={{ marginRight: "10px " }}>File </b> {i + 1}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} sm={7} xs={12} pt={4}>
                                        <Typography variant="subtitle1" >
                                            <img style={{ width: "100%", maxHeight: "200px" }} src={document} alt="" onClick={() => downloadImage(document)} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                        {complainData && complainData.ComplainDocument && !Array.isArray(complainData.ComplainDocument.ComplainDocumentPath) ? (
                            <Fragment>
                                <Grid item md={12} sm={12} xs={12} pt={4}>
                                    <Typography variant="subtitle1" style={{
                                        verticalAlign: 'middle',
                                        display: 'inline-flex'
                                    }}>
                                        <b style={{ marginRight: "10px " }}>File: </b> Private
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={7} xs={12} pt={4}>
                                    <Typography variant="subtitle1" >
                                        <img style={{ width: "100%", maxHeight: "300px", borderRadius: "20px" }} src={complainData.ComplainDocument.ComplainDocumentPath} alt="" onClick={() => downloadImage(document)} />
                                    </Typography>
                                </Grid>
                            </Fragment>
                        ) : ""}
                        <Grid container>
                            <Grid container mt={6}>
                                <Typography variant="h6" mb={1}>
                                    Comments
                                </Typography>
                            </Grid>
                            {complainData && complainData.comments && complainData.comments.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
                                .map((comment, i) => {
                                    return auth.user.id === comment.userid ? (
                                        <Grid container my={3} key={i}>
                                            <Grid item md={10} sm={12} xs={12} container>
                                                <Box style={{ width: "100%", display: "flex", justifyContent: "space-between" }} mb={1}>
                                                    <Typography style={{ textAlign: "start" }}>
                                                        <b>{comment.by}</b>
                                                    </Typography>
                                                    <Typography style={{ textAlign: "start" }}>
                                                        {toDateTime(comment.createdAt._seconds)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12} py={1} px={2} style={{ background: "#3AAFA8", borderRadius: "20px", color: "#fff" }}>
                                                <Typography>
                                                    {ReactHtmlParser(comment.comments)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container my={3}
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            key={i}
                                        >
                                            <Grid item md={10} sm={12} xs={12} container>
                                                <Box style={{ width: "100%", display: "flex", justifyContent: "space-between" }} mb={1}>
                                                    <Typography style={{ textAlign: "start" }}>
                                                        <b>{comment.by}</b>
                                                    </Typography>
                                                    <Typography style={{ textAlign: "start" }}>
                                                        {toDateTime(comment.createdAt._seconds)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12} py={1} pl={3} style={{ background: "#eee", borderRadius: "20px", color: "#000" }}>
                                                {ReactHtmlParser(comment.comments)}
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                    </Grid>

                </Grid >
                <Grid container item px={{ xs: 2, sm: 4, md: 8 }} mb={4} md={12} sm={12} xs={12}>
                    <Grid container mt={12}>
                        <Typography variant="h6" mb={3}>
                            Additional Comments
                        </Typography>
                    </Grid>
                    <Grid container style={{ background: "#fff", color: "#1F5B88" }} px={5} py={5} boxShadow={8} borderRadius="20px">

                        <Grid item container style={{ background: "#fff" }} py={4} px={0} direction="row" alignItems="start">
                            <Grid item md={12} sm={12} xs={12}>
                                <Editor
                                    apiKey="dd83bg0e7v7jnnfjjqwg7bktooeb1n4wcn2vn7vmeaof51y5"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue=""
                                    id="description"
                                    name="description"
                                    onEditorChange={(content, editor) =>
                                        parseEditorData(content)
                                    }

                                    init={{
                                        height: 150,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                                <FormHelperText style={{ color: "red" }}>{
                                    descriptionError !== "" ? descriptionError : ""
                                }</FormHelperText>
                            </Grid>
                            <Grid item container style={{ background: "#fff" }} py={4} display="flex" direction="row" justifyContent="flex-end">
                                <Button
                                    onClick={handleClick}
                                    style={{ color: "#fff" }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Reply
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );


}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ComplainDepartmentChange);