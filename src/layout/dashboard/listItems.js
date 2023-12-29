import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LoginIcon from "@mui/icons-material/Login";
import GroupsIcon from "@mui/icons-material/Groups";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { superAdminData, superAdminLogout } from "../../redux/SuperAdminSlice";

export const MainListItems = () => {
  const dispatch = useDispatch();

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
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/">
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => dispatch(superAdminLogout())}
          primary="Logout"
        />
      </ListItemButton>
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
