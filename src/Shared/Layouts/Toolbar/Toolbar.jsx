import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { useHistory } from "react-router";
import PanToolIcon from '@mui/icons-material/PanTool';
import { useEffect } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { Fragment } from "react";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
const AppToolbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  let history = useHistory();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {

  })

  const logout = () => {
    props.logout(history);
    history.push('/login')
  }


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";


  const renderMenu = (
    <Menu
      style={{
        top: "6px"
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/profile" style={{ textDecoration: "none", color: "#000" }}><PersonIcon mr={1} style={{ fontSize: "16px", marginBottom: "-2px" }} />Profile</Link></MenuItem>
    </Menu >
  );

  const mobileMenuId = "primary-search-account-menu-mobile";


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/about-us" style={{ textDecoration: "none", color: "#000" }}><InfoIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />About Us</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/contactus" style={{ textDecoration: "none", color: "#000" }}><ContactsIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Contact Us</Link></MenuItem>

      {!localStorage.getItem("token") ? (<Box>
        <MenuItem onClick={handleMenuClose}><Link to="/login" style={{ textDecoration: "none", color: "#000" }}><LockOpenIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Login</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><Link to="/register" style={{ textDecoration: "none", color: "#000" }}><VpnKeyIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Register</Link></MenuItem>
      </Box>) : (props.auth.isAuthenticated && (props.auth.user.UserRole !== "SuperAdmin" && props.auth.user.UserRole !== "Department Employee")) ?
        (<Box>
          <MenuItem onClick={handleMenuClose}><Link to="/raise" style={{ textDecoration: "none", color: "#000" }}><PanToolIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Raise Complaint</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="/public-complain" style={{ textDecoration: "none", color: "#000" }}><AllInboxIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} /> Complaints</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="/dashboard" style={{ textDecoration: "none", color: "#000" }}><AllInboxIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} /> Dashboard</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="/profile" style={{ textDecoration: "none", color: "#000" }}><PersonIcon mr={1} style={{ fontSize: "16px", marginBottom: "-2px" }} />Profile</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="#" style={{ textDecoration: "none", color: "#000" }} onClick={logout}><ExitToAppIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Logout</Link></MenuItem>
        </Box>) : (<Box>
          <MenuItem onClick={handleMenuClose}><Link to="/public-complain" style={{ textDecoration: "none", color: "#000" }}><AllInboxIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} /> Complaints</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="/dashboard" style={{ textDecoration: "none", color: "#000" }}><AllInboxIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} /> Dashboard</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="/profile" style={{ textDecoration: "none", color: "#000" }}><PersonIcon mr={1} style={{ fontSize: "16px", marginBottom: "-2px" }} />Profile</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link to="#" onClick={logout} style={{ textDecoration: "none", color: "#000" }}><ExitToAppIcon mr={1} style={{ fontSize: "16px", marginBottom: "-1px" }} />Logout</Link></MenuItem>
        </Box>)
      }

    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} bgcolor="#fff">
      <AppBar position="static" color="secondary" style={{ color: "#fff" }}>
        <Toolbar bgcolor="#fff">
          <Link to="/" style={{ display: "flex", color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "bold" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              E-ComplaintBox
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "block" } }}>

            <Link to="/" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
              Home
            </Link>
            <Link to="/about-us" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
              About Us
            </Link>
            <Link to="/contactus" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
              Contact Us
            </Link>

            {!localStorage.getItem("token") ? (
              < React.Fragment >
                <Button variant="contained" size="small" color="success" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff", marginRight: "10px" }} component={Link} to={'/login'}>
                  Login
                </Button>
                <Button variant="contained" color="success" size="small" component={Link} to={'/register'} style={{ borderRadius: "30px", background: "#23A94B", color: "#fff", marginRight: "10px" }}>
                  Registration
                </Button>
              </React.Fragment>
            ) : props.auth.isAuthenticated && (props.auth.user.UserRole !== "SuperAdmin" && props.auth.user.UserRole !== "Department Employee") ? (
              <React.Fragment>
                <Link to="/raise" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
                  Raise Complaint
                </Link>
                <Link to="/public-complain" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
                  Complaints
                </Link>
                <Link to="/dashboard" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
                  Dashboard
                </Link>
                <Button variant="contained" size="small" color="success" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff", marginRight: "10px" }} onClick={logout}>
                  Logout
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/public-complain" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
                  Complaints
                </Link>
                <Link to="/dashboard" variant="contained" size="small" color="success" style={{ color: "#fff", textDecoration: "none", alignItems: "center", fontWeight: "regular", marginRight: "10px" }}>
                  Dashboard
                </Link>
                <Button variant="contained" size="small" color="success" style={{ borderRadius: "30px", background: "#23A94B", color: "#fff", marginRight: "10px" }} onClick={logout}>
                  Logout
                </Button>
              </React.Fragment>
            )

            }
            {props.auth.user && props.auth.user ? (<IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>) : ""}


          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {props.auth.user && props.auth.user ? renderMenu : ""}
    </Box >
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(AppToolbar);
