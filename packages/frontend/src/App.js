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
import PrivateRoute from "./components/Routing/PrivateRoute";
import ComplainDetails from "./components/ComplainDetails/ComplainDetails";
import ComplainDepartmentChange from "./components/ComplainDepartmentChange/ComplainDepartmentChange";
import { useHistory } from "react-router-dom";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import UpdateComplain from "./components/RaiseComplain/UpdateComplain";
import Aboutus from "./components/Aboutus/Aboutus";
import PublicDashboard from "./components/PublicDashboard/PublicDashboard";
import Profile from "./components/profile/Profile";
import Contactus from "./components/Contactus/Contactus";
import FAQ from "./components/FAQ/FAQ";
import TermsAndConditions from "./components/terms and conditions/TermsAndConditions";
import PrivacyAndPolicy from "./components/Privacy and Policy/PrivacyAndPolicy";
const App = ({ auth }) => {
  const history = useHistory();

  useEffect(() => {
    store.dispatch(loadUser());
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
            <PrivateRoute exact path="/raise" component={RaiseComplaints} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />{" "}
            <Route exact path="/about-us" component={Aboutus} />{" "}
            <Route exact path="/contactus" component={Contactus} />{" "}
            <PrivateRoute exact path="/profile" component={Profile} />{" "}
            <Route exact path="/FAQ" component={FAQ} />{" "}
            <Route exact path="/public-complain" component={PublicDashboard} />
            <Route
              exact
              path="/terms-conditions"
              component={TermsAndConditions}
            />
            {""}
            <Route exact path="/privacy-policy" component={PrivacyAndPolicy} />
            {""}
            <PrivateRoute
              path="/complain-department-details/:id"
              component={ComplainDepartmentChange}
            />{" "}
            <PrivateRoute
              path="/complain-details/:id"
              component={ComplainDetails}
            />{" "}
            <PrivateRoute path="/update/:id" component={UpdateComplain} />{" "}
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
