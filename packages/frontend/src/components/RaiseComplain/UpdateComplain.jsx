import { Grid, Typography } from '@mui/material';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import PublicIcon from '@mui/icons-material/Public';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import SubjectIcon from '@mui/icons-material/Subject';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import { FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PanelHeader from '../../Shared/common/PanelHeader';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { imageupload } from "../../Shared/Api/api";
import { getSingleComplainData, updateComplain } from '../../Shared/Api/api';
import Loader from '../../Shared/common/Loader';
import LoggedUserInfo from '../../Shared/common/LoggedUserInfo';

const validationSchema = yup.object({
    department: yup
        .string('Enter your Department')
        .required('Department is required'),
    city: yup
        .string('Enter your City')
        .required('City is required'),
    complainType: yup
        .string('Enter your Complain type')
        .required('Complain type is required'),
    severity: yup
        .string('Enter your Severity type')
        .required('Severity type is required'),
    subject: yup
        .string('Enter your Subject')
        .required('Subject is required'),


});

function UpdateComplaints({ auth }) {
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [descriptionError, setDescriptionError] = useState("");
    const [complainData, setComplainData] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false)
    const [severityMessage, setSeverityMessage] = useState("")

    const [initialValuesForm, setInitialValuesForm] = useState({
        department: "",
        city: '',
        complainType: "",
        severity: '',
        subject: ''
    })
    const [loader, setLoader] = useState(true)
    let history = useHistory();
    let { id } = useParams()
    const editorRef = useRef(null);



    const onDrop = (files) => {
        setFiles(files)
    };
    useEffect(async () => {
        const data = await getSingleComplainData(id)
            .then(res => {
                setComplainData(res)
                setInitialValues();
                setDataLoaded(true)
                setLoader(false);
            })
    }, [setComplainData, dataLoaded]);
    const setInitialValues = () => {
        setInitialValuesForm({
            department: complainData.ComplainDepartmentID,
            city: complainData.ComplainCity,
            complainType: complainData.ComplainType,
            severity: complainData.ComplainSeverity,
            subject: complainData.ComplainSubject
        })
    }
    console.log(initialValuesForm)
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

    const handleSeverityClick = (e) => {
        switch (e.target.value) {
            case "critical":
                setSeverityMessage("This issue should me responded immediately")
                break;
            case "high":
                setSeverityMessage("This issue should me responded within couple of hours")
                break;
            case "medium":
                setSeverityMessage("This issue should me responded within couple of days")
                break;
            case "low":
                setSeverityMessage("This issue should me responded within couple of weeks")
                break;
            default:
                setSeverityMessage("")
        }
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


    const formik = useFormik({
        initialValues: initialValuesForm,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (allValues) => {
            let textContent = editorRef.current.getContent({ format: 'text' })
            if (textContent !== "" && textContent !== "undefined") {
                allValues.description = description.description;
                allValues.files = files;
                setDescriptionError("")

            } else {
                setDescriptionError(descriptionErrorMessage)
            }
            console.log(allValues)
            await new Promise((r) => setTimeout(updateComplain(allValues, history, id)));
        },
    });
    const newFiles = files.map((file, i) => (
        <Fragment key={i}>
            <li key={file.name} style={{ listStyle: "none" }}>
                <Grid container>
                    <Grid item md={1} sm={1} xs={2}>
                        <AttachFileIcon />
                    </Grid>
                    <Grid item md={11} sm={11} xs={10}>
                        <Typography>
                            {file.name} - {file.size} bytes
                        </Typography>
                    </Grid>
                </Grid>
            </li>
        </Fragment>

    ));
    return loader && initialValuesForm.city === "" ?
        (<Grid container px={12} mt={12} style={{ height: "100%" }}>
            <Loader />
        </Grid>) : (
            <Grid container >
                {auth.user ? (<LoggedUserInfo auth={auth} />) : ""
                }
                <Grid item container mx={{ xs: 2, sm: 4, md: 8 }} mb={8} borderRadius="20px" boxShadow={20} style={{ background: "#fff" }}>
                    <PanelHeader title={"Update Complain"} />
                    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                        <Grid container px={3} pt={4} spacing={3}>

                            <Grid item container pt={4} md={6}>
                                <Grid item md={12} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                    <PublicIcon style={{ marginRight: "10px" }} />
                                    <TextField
                                        variant="outlined"
                                        name="city"
                                        id="city"
                                        select
                                        fullWidth
                                        label="Select Your city"
                                        value={formik.values.city ? formik.values.city : ""}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.city &&
                                            Boolean(formik.errors.city)
                                        }
                                        helperText={
                                            formik.touched.city && formik.errors.city
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"uTrinC9Mb1xUJp7hBhFs"}>Bulandshahar</MenuItem>
                                        <MenuItem value={"XNYE2aGK1QP6y7TFEo4t"}>Ghaziabad</MenuItem>
                                        <MenuItem value={"kudlyUz1YV3mb5x8UewP"}>Kanpur</MenuItem>
                                        <MenuItem value={"xk9a1yaOSn4eYLHCcRzY"}>Meerut</MenuItem>
                                        <MenuItem value={"LcbMsHmo3vlyZBtVRISp"}>Muzaffarnagar</MenuItem>
                                        <MenuItem value={"Lrgd20uPHAmjs0BgvTBO"}>Noida</MenuItem>
                                        <MenuItem value={"oqc4tQFg2vNzwuTfEUWR"}>Saharanpur</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid item container pt={4} direction="row" alignItems="center" md={6}>
                                <Grid item md={12} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                    <WorkOutlineIcon style={{ marginRight: "10px" }} />
                                    <TextField
                                        variant="outlined"
                                        name="department"
                                        id="department"
                                        select
                                        fullWidth
                                        label="Select Your Department"
                                        value={formik.values.department ? formik.values.department : ""}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.department &&
                                            Boolean(formik.errors.department)
                                        }
                                        helperText={
                                            formik.touched.department && formik.errors.department
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
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
                            </Grid>
                        </Grid>
                        <Grid container px={3} spacing={3} pt={4}>

                            <Grid item container pt={4} md={6}>
                                <Grid item md={11} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                    <WarningAmberIcon style={{ marginRight: "10px" }} />
                                    <FormControl component="fieldset" error={
                                        formik.touched.complainType &&
                                        Boolean(formik.errors.complainType)
                                    }>
                                        <RadioGroup row aria-label="gender" name="complainType" onChange={formik.handleChange} value={formik.values.complainType ? formik.values.complainType : ""}>
                                            <FormLabel component="legend" style={{ marginRight: "15px", marginTop: "10px" }} name="complainType">Complain Type:</FormLabel>
                                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormHelperText style={{ color: "red" }}>{
                                        formik.touched.complainType &&
                                        formik.errors.complainType
                                    }</FormHelperText>
                                </Grid>
                            </Grid>
                            <Grid item container pt={4} direction="row" alignItems="center" md={6}>
                                <Grid item md={11} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                    <FlashAutoIcon style={{ marginRight: "10px" }} />
                                    <FormControl component="fieldset" error={
                                        formik.touched.severity &&
                                        Boolean(formik.errors.severity)
                                    }>
                                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" name="severity" onChange={formik.handleChange} value={formik.values.severity ? formik.values.severity : ""}>
                                            <FormLabel component="legend" name="severity" style={{ marginRight: "15px", marginTop: "10px" }}>Severity:</FormLabel>
                                            <FormControlLabel value="critical" control={<Radio />} label="Critical" onClick={handleSeverityClick} />
                                            <FormControlLabel value="high" control={<Radio />} label="Hign" onClick={handleSeverityClick} />
                                            <FormControlLabel value="medium" control={<Radio />} label="Medium" onClick={handleSeverityClick} />
                                            <FormControlLabel value="low" control={<Radio />} label="Low" onClick={handleSeverityClick} />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormHelperText style={{ color: "red" }}>{
                                        formik.touched.severity &&
                                        formik.errors.severity
                                    }</FormHelperText>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item container pt={4} px={3}>
                            <Grid item md={12} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                <SubjectIcon style={{ marginRight: "10px" }} />
                                <TextField
                                    color="primary"
                                    margin="normal"
                                    fullWidth
                                    id="subject"
                                    type="text"
                                    label="Please provide the subject line"
                                    name="subject"
                                    autoComplete="subject"
                                    autoFocus
                                    variant="outlined"
                                    value={formik.values.subject ? formik.values.subject : ""}
                                    onChange={formik.handleChange}
                                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                                    helperText={formik.touched.subject && formik.errors.subject}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container pt={4} px={3}>
                            <Grid item md={12} sm={11} xs={10} display="flex" direction="row" alignItems="center">
                                <FormatTextdirectionLToRIcon style={{ marginRight: "10px" }} />
                                <Editor
                                    apiKey="dd83bg0e7v7jnnfjjqwg7bktooeb1n4wcn2vn7vmeaof51y5"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={complainData.ComplainDescription}
                                    id="description"
                                    name="description"
                                    onEditorChange={(content, editor) =>
                                        parseEditorData(content)
                                    }

                                    init={{
                                        width: "100%",
                                        height: 300,
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
                        </Grid>

                        <Grid item container pt={4} px={3}>
                            <Grid item md={12} sm={11} xs={10} style={{ overflow: "hidden" }} display="flex" direction="row" alignItems="center">
                                <CloudUploadIcon style={{ marginRight: "10px" }} />
                                <Dropzone onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="container" style={{ width: "100%" }}>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <p style={{
                                                    border: "1px dashed grey",
                                                    padding: "20px",
                                                    background: "#f8f8f8",
                                                }}>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside>
                                                <h4>{files.length > 0 ? "Files" : ""}</h4>
                                                < ul > {newFiles}</ul>
                                            </aside>
                                        </section>
                                    )}
                                </Dropzone>
                            </Grid>
                        </Grid>
                        <Grid item container style={{ background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }} py={4} px={4} direction="row" alignItems="center">
                            <Button
                                onClick={handleClick}
                                style={{ color: "#fff" }}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Update Complain
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { imageupload })(UpdateComplaints);
