import React, { Fragment, useEffect } from "react";
import AppToolbar from "./Shared/Layouts/Toolbar/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Switch, Route } from "react-router-dom";
import { loadUser } from "./redux/actions/auth";
import Login from "./components/Login/Login";
import AppFooter from "./Shared/Layouts/Footer/Footer";
import { Grid } from "@mui/material";
import Register from "./components/Registration/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import RaiseComplaints from "./components/RaiseComplain/RaiseComplaints";
import Homepage from "./components/Homepage/Homepage";
import EmailVerifications from "./components/Emailverification/EmailVerifications";
import MobileVerifications from "./components/Mobileverification/MobileVerifications";
import ComplainDetails from "./components/ComplainDetails/ComplainDetails";
import ComplainDepartmentChange from "./components/ComplainDepartmentChange/ComplainDepartmentChange";
import { useHistory } from "react-router-dom";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import UpdateComplain from "./components/RaiseComplain/UpdateComplain";
import Aboutus from "./components/Aboutus/Aboutus";
const App = ({ auth }) => {
  const history = useHistory();

  useEffect(() => {
    store.dispatch(loadUser());
    let token = localStorage.getItem("token");
    if (token && !auth.token) {
      localStorage.removeItem("token");
      history.push("/login");
    } else if (!token) {
      history.push("/login");
    }
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3AAFA9",
      },
      secondary: {
        light: "#0066ff",
        main: "rgb(36,98,95)",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#ffcc00",
      },
      text: {
        secondary: {
          main: "#ffffff",
        },
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <AppToolbar />
        <Grid
          item
          minHeight="70vh"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          bgcolor="#eee"
        >
          <ToastContainer autoClose={5000} />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/raise" component={RaiseComplaints} />
            <Route exact path="/dashboard" component={Dashboard} />{" "}
            <Route exact path="/about-us" component={Aboutus} />{" "}
            <Route
              path="/complain-department-details/:id"
              component={ComplainDepartmentChange}
            />{" "}
            <Route path="/complain-details/:id" component={ComplainDetails} />{" "}
            <Route path="/update/:id" component={UpdateComplain} />{" "}
            <Route
              exact
              path="/email-verification"
              component={EmailVerifications}
            ></Route>
            <Route
              exact
              path="/mobile-verification"
              component={MobileVerifications}
            ></Route>
            <Route exact path="/" component={Homepage}></Route>
          </Switch>
        </Grid>
        <AppFooter />
      </Fragment>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
