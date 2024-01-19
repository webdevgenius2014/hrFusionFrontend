import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CommonModal from "../../components/modal/commonModal";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "./Sidenav";
import { Footer } from "./Footer";
import Brand from "../../components/Brand";
import { defaultTheme } from "../../theme/theme";
import LoginServices from "../../services/loginServices/LoginServices";
import CommonServices from "../../services/CommonServices";
import { persistor } from "../../redux/Store";
import {ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInputText } from "../../components/form-components/formInputText";
import Button from "@mui/material/Button";
YupPassword(Yup);

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DashboardLayout = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openChnPass, setOpenChnpass] = useState(false);
  const handlePassOpen = () => setOpenChnpass(true);
  const handlePassClose = () => setOpenChnpass(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      // .matches(passwordRules, { message: "must constain uppercase lower case numer and symbol" }),
      .min(6, "password must contain 6 chracters Eg.(Abcd@123)")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    c_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    old_password: Yup.string().required("Required"),
  });
  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const settings = ["Account", "Change password", "Logout"];
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSettings = (setting) => {
    console.log(setting);
    if (setting === "Account") {
    } else if (setting === "Change password") {
      handlePassOpen();
    } else if (setting === "Logout") {
      Logout();
    }
  };
  const handleClearPersistedData = () => {
    persistor.purge();
    dispatch(superAdminLogout());
    sessionStorage.clear();
  };
  // api calls ----------------------------------------------------------------
  const Logout = () => {
    sessionStorage.clear();
    handleClearPersistedData();
    LoginServices.superAdminLogout()
      .then((res) => {
        console.log(res);
        if (res.success === 200) {
          toast.success("logged out successfully");
        }
      })
      .catch((err) => {
        console.log("error in logout", err);
      });
  }
  // Change Password ----------------------------------------------------------------
  const changePassword = (payload) => {
    setLoading(true);
    console.log("change password payload", payload);
    CommonServices.changePass(payload)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response?.data?.message);
        }
        if (response.status === 403) {
          console.log("first");
          console.log(response?.data);
          toast.error(response?.data?.errors);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("sign in catch", error);
      });
    // end api --------------------------------
  };

  // end api --------------------------------

  const theme = defaultTheme;
  return (
    <>
    <ToastContainer style={{ fontSize: "14px", zIndex: 1204 }}/>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              bgcolor: theme.palette.grey[400],
              zIndex:'999'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              HrFusion
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/3.jpg"
                    style={{
                      border: "0.1px solid lightgray",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => handleSettings(setting)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Brand open={open} />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Sidenav />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box maxWidth="xl" as="div" sx={{ minHeight: "75vh" }}>
              <Outlet />
            </Box>
            <Footer />
          </Container>
        </Box>
      </Box>
      <CommonModal isOpen={openChnPass} isClose={handlePassClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            width: 400,
            maxWidth: "100%",
          }}
        >
          <form noValidate onSubmit={handleSubmit(changePassword)}>
            <FormInputText
              required
              fullWidth
              type="password"
              id="curentpass"
              label="Current Password"
              name="old_password"
              size="small"
              // defaultValue={props.dep_name }
              error={errors && errors?.old_password}
              control={control}
              autoComplete="family-name"
            />
            <FormInputText
              required
              fullWidth
              type="password"
              id="newpass"
              label="New Password"
              name="password"
              size="small"
              // defaultValue={props.dep_name }
              error={errors && errors?.password}
              control={control}
              autoComplete="family-name"
            />
            <FormInputText
              required
              fullWidth
              type="password"
              id="conformpass"
              label="Confirm Password"
              name="c_password"
              size="small"
              // defaultValue={props.dep_name }
              error={errors && errors?.c_password}
              control={control}
              autoComplete="family-name"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "13px",
                margin: "auto",
                display: "flex",
                justifyContent: "center ",
              }}
            >
              Update Password
            </Button>
          </form>
        </Box>
      </CommonModal>
    </>
  );
};
export default DashboardLayout;
