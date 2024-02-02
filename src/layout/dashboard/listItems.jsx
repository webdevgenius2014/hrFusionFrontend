import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import CakeIcon from "@mui/icons-material/Cake";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { ClientAccordion } from "./ClientAccordion";

export const MainListItems = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/departments">
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Departments" />
      </ListItemButton>
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/designations">
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Designations" />
      </ListItemButton>
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/employees">
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItemButton>
      <ClientAccordion handleChange={handleChange} expanded={expanded} />
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/Employees-Birthday">
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText primary="Employee Birthday" />
      </ListItemButton>
      <ListItemButton component={NavLink} onClick={handleChange('false')} to="/generalSettings">
        <ListItemIcon>
          <SettingsSuggestIcon />
        </ListItemIcon>
        <ListItemText primary="General Settings" />
      </ListItemButton>

      {/* <ListItemButton component={NavLink} to="/">
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
