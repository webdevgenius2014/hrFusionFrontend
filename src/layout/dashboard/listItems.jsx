import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {useNavigate } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import { NavLink } from "react-router-dom";
import Person3Icon from '@mui/icons-material/Person3';
import { useDispatch } from "react-redux";
import WorkIcon from '@mui/icons-material/Work';
import {superAdminLogout } from "../../redux/SuperAdminSlice";
import LoginServices from "../../services/loginServices/LoginServices";
import { persistor } from '../../redux/Store';
import { toast } from "react-toastify";
import CakeIcon from '@mui/icons-material/Cake';
import AddCommentIcon from '@mui/icons-material/AddComment';
import "react-toastify/dist/ReactToastify.css";




export const MainListItems = () => {
  const dispatch = useDispatch();
  const handleClearPersistedData = () => {
    persistor.purge(); 
    dispatch(superAdminLogout());
    sessionStorage.clear();
  };
  // lougout ----------------------------
  // const onSubmit =  () => {
  //   sessionStorage.clear();
  //   handleClearPersistedData();
  //    LoginServices.superAdminLogout()
  //   .then((res) => {
  //     console.log(res)
  //     if(res.success===200) {
  //       toast.success('logged out successfully')
  //     }
  //   })
  //   .catch((err) =>{
  //         console.log('error in logout', err)
  //   })
  //   // end api --------------------------------
  // };



  return (
    <>
      <ListItemButton component={NavLink} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/departments">
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Departments" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/designations">
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Designations" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/employees">
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/clients">
        <ListItemIcon>
          <Person3Icon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/Projects">
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/template">
        <ListItemIcon>
          <AddCommentIcon />
        </ListItemIcon>
        <ListItemText primary="Template" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/Employees-Birthday">
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText primary="Employee Birthday" />
      </ListItemButton>
     { /* <ListItemButton component={NavLink} to="/">
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText
          onClick={onSubmit}
          primary="Logout"
        />
  </ListItemButton>  */}
    </>
  );
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </>
);
