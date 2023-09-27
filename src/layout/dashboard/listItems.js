import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink, Link } from 'react-router-dom';
export const mainListItems = (
  <>
    <ListItemButton component= {NavLink} to='/'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>  
    <ListItemButton component= {NavLink} to='/departments'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Departments" />
    </ListItemButton>
    <ListItemButton component= {NavLink} to='/designations'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Designations" />
    </ListItemButton> 
    <ListItemButton component={NavLink} to='/login'>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItemButton>    
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </>
);