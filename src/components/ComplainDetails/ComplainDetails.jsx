import { Grid, Typography, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { FormHelperText } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { getSingleComplainData } from '../../Shared/Api/api';
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import DateRangeIcon from '@mui/icons-material/DateRange';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Public from '@mui/icons-material/Public';
import Subject from '@mui/icons-material/Subject';
import CloudUpload from '@mui/icons-material/CloudUpload';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import { Fragment } from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../../Shared/common/Loader';
function ComplainDetails(props) {
    const [complainData, setComplainData] = useState({})
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const editorRef = useRef(null);
    const [loaded, setLoaded] = useState(true)

    let { id } = useParams()
    let history = useHistory()
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


    const handleClick = () => {
        let textContent = editorRef.current.getContent({ format: 'text' })
        if (textContent !== "" && textContent !== "undefined") {
            setDescription({ description: editorRef.current.getContent() });
            setDescriptionError("")
        } else {
            setDescriptionError("Description field is required")
        }
    }

    const redirectToComplainUpdatePage = () => {
        history.push(`/update/${id}`)
    }

    useEffect(async () => {
        const data = await getSingleComplainData(id)
            .then(res => {
                setComplainData(res)
                setLoaded(false)
            })
    }, [setComplainData]);

    console.log(complainData)

    // console.log(complainData.ComplainDocument.ComplainDocumentPath.length)
    return loaded ?
        (<Grid container px={12} mt={12} style={{ height: "100%" }}>
            <Loader />
        </Grid>) : (
            <Grid container py={12} px={{ xs: 2, sm: 10, md: 20 }}>
                <Grid container>
                    <Grid item md={6} sm={6} xs={6}>
                        <Typography>
                            Complaint ID: {id}
                        </Typography>
                        <Typography>
                            Complaint Status: {complainData.ComplainStatus}
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
                <Grid container mt={5}>
                    <Button variant="outlined" onClick={redirectToComplainUpdatePage}>Edit Complaint</Button>
                </Grid>
                <Grid container style={{ background: "#fff", color: "#1F5B88" }} py={4} px={4} mt={5} borderRadius="20px" boxShadow={10}>
                    <Grid item container direction="row" alignItems="center">
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <WarningAmberIcon /> <b style={{ marginRight: "10px " }}>Status: </b> <b style={{ color: "green" }}>{complainData.ComplainStatus}</b>
                            </Typography>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} pt={4} sm={{ textAlign: "left" }} sm={{ textAlign: "left" }}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <DateRangeIcon /> <b style={{ marginRight: "10px " }}>Date: </b> {complainData.ComplainStatus}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="center">
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <WarningAmberIcon /> <b style={{ marginRight: "10px " }}>Complaint Type: </b> {complainData.ComplainType}
                            </Typography>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <FlashAutoIcon /> <b style={{ marginRight: "10px " }}>Complaint Severity: </b> {complainData.ComplainSeverity}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="center">
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <WorkOutline /> <b style={{ marginRight: "10px " }}>Department: </b> {complainData.department?.DepartmentName}
                            </Typography>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <Public /> <b style={{ marginRight: "10px " }}>City: </b> {complainData.city?.CityName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="center">
                        <Grid item md={6} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <Subject /> <b style={{ marginRight: "10px " }}>Subject Line: </b> {complainData.ComplainSubject}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container pt={5}>
                        <Typography variant="h6">
                            Description
                        </Typography>
                    </Grid>
                    <Grid container pt={5}>
                        <Typography variant="subtitle1">
                            {ReactHtmlParser(complainData.ComplainDescription)}
                        </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center">
                        <Grid item md={12} sm={12} xs={12} pt={4}>
                            <Typography variant="subtitle1" style={{
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                <CloudUpload /> <b style={{ marginRight: "10px " }}>Files: </b>
                            </Typography>
                        </Grid>

                        {/* <Grid item md={6} sm={12} xs={12} pt={4}>
                        <Typography variant="subtitle1" >
                            <img style={{ width: "100%", maxHeight: "200px" }} src={complainData.ComplainDocument.ComplainDocumentPath} alt="" />
                        </Typography>
                    </Grid> */}
                        {complainData && complainData.ComplainDocument && Array.isArray(complainData.ComplainDocument.ComplainDocumentPath) && complainData.ComplainDocument.ComplainDocumentPath.map((document, i) => {
                            return (
                                <Grid item container direction="row" alignItems="center" md={12}>
                                    <Grid item md={8} sm={12} xs={12} pt={4}>
                                        <Typography variant="subtitle1" style={{
                                            verticalAlign: 'middle',
                                            display: 'inline-flex'
                                        }}>
                                            <b style={{ marginRight: "10px " }}>File </b> {i + 1}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} pt={4}>
                                        <Typography variant="subtitle1" >
                                            <img style={{ width: "100%", maxHeight: "200px" }} src={document} alt="" />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                        {complainData && complainData.ComplainDocument && !Array.isArray(complainData.ComplainDocument.ComplainDocumentPath) ? (
                            <Fragment>
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
                                        <img style={{ width: "100%", maxHeight: "200px" }} src={complainData.ComplainDocument.ComplainDocumentPath} alt="" />
                                    </Typography>
                                </Grid>
                            </Fragment>
                        ) : ""}

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

export default ComplainDetails;