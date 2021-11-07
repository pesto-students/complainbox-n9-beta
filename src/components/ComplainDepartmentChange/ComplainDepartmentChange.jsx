import { Box, Grid, Typography, Button } from '@mui/material';
import React, { useState, useRef } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EmailVerificationImage from "../../assets/EmailVerification.png";
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
import CloudUpload from '@mui/icons-material/CloudUpload';

function ComplainDepartmentChange(props) {
    const [description, setDescription] = useState("");
    const [complainStatus, setComplainStatus] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const editorRef = useRef(null);


    const parseEditorData = (content) => {
        let textContent = editorRef.current.getContent({ format: 'text' })
        if (textContent !== "" && textContent !== "undefined") {
            setDescription({ description: content });
            setDescriptionError("")
        } else {
            setDescriptionError("Description field is required")
        }
        console.log(descriptionError);
    }

    const handleChangeStatus = (e) => {
        setComplainStatus({ complainStatus: e.target.value })
    }
    const handleSubmitStatus = (e) => {
        e.preventDefault();
        console.log(complainStatus)
        //pass it in api
    }
    const handleClick = () => {
        let textContent = editorRef.current.getContent({ format: 'text' })
        if (textContent !== "" && textContent !== "undefined") {
            setDescription({ description: editorRef.current.getContent() });
            setDescriptionError("")
        } else {
            setDescriptionError("Description field is required")
        }
    }
    return (
        <Grid container py={12} px={20}>
            <Grid container>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography>
                        Complain ID: 112345
                    </Typography>
                    <Typography>
                        Complain Status: In Progress
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Typography>
                        Welcome Sazzad Mahmud
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container py={4} direction="row" alignItems="center">

                <Grid item >
                    <FormControl component="fieldset">
                        <RadioGroup size="large"
                            row aria-label="gender" name="row-radio-buttons-group" name="severity" onChange={handleChangeStatus}>
                            <FormLabel component="legend" name="severity" style={{ marginRight: "15px", marginTop: "10px" }}></FormLabel>
                            <FormControlLabel value="raised" control={<Radio />} label="Raised" />
                            <FormControlLabel value="inprogress" control={<Radio />} label="In Progress" />
                            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" size="large" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff" }} onClick={handleSubmitStatus}>
                        Change the status
                    </Button>
                </Grid>
            </Grid>
            <Grid container style={{ background: "#fff", color: "#1F5B88" }} py={4} px={4} mt={12}>
                <Grid item container direction="row" alignItems="center">
                    <Grid item md={12} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <DateRangeIcon /> <b style={{ marginRight: "10px " }}>Date: </b> 12-06-2001
                        </Typography>
                    </Grid>

                </Grid>
                <Grid item container direction="row" alignItems="center">
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <WarningAmberIcon /> <b style={{ marginRight: "10px " }}>Complain Type: </b> Private
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <FlashAutoIcon /> <b style={{ marginRight: "10px " }}>Severity: </b> Major
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="row" alignItems="center">
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <WorkOutline /> <b style={{ marginRight: "10px " }}>Departmebnt: </b> Private
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <Public /> <b style={{ marginRight: "10px " }}>City: </b> Private
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="row" alignItems="center">
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <Subject /> <b style={{ marginRight: "10px " }}>Subject Line: </b> This is a test subject
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container pt={5}>
                    <Typography variant="subtitle1" pl={2}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </Grid>
                <Grid item container direction="row" alignItems="center">
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <CloudUpload /> <b style={{ marginRight: "10px " }}>Departmebnt: </b> Private
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" >
                            <img style={{ width: "100%", maxHeight: "200px" }} src={EmailVerificationImage} alt="" />
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" style={{
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            <b style={{ marginRight: "10px " }}>Departmebnt: </b> Private
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" >
                            <img style={{ width: "100%", maxHeight: "200px" }} src={EmailVerificationImage} alt="" />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container mt={12}>
                <Typography variant="h6">
                    Communication
                </Typography>
            </Grid>
            <Grid container style={{ background: "#fff", color: "#1F5B88" }} px={5} py={5}>
                <Grid container>
                    <Grid item md={6} sm={12} xs={12} >
                        <Typography style={{ textAlign: "start" }}>
                            <b>Health Department</b>
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pr={3}>
                        <Typography style={{ textAlign: "start" }}>
                            29-12-2091
                        </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container pt={5}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Grid item md={3} sm={12} xs={12} >
                        <Typography style={{ textAlign: "end" }}>
                            29-12-2091
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} pr={3}>
                        <Typography style={{ textAlign: "end" }}>
                            <b>Sazzad Mahmud</b>
                        </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container style={{ background: "#fff" }} py={4} px={4} direction="row" alignItems="start">
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
                            height: 100,
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
                <Grid item container style={{ background: "#fff" }} py={4} px={4} direction="row" alignItems="center">
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
    );
}

export default ComplainDepartmentChange;