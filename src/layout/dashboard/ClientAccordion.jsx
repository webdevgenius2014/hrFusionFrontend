import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Person3Icon from "@mui/icons-material/Person3";
import WorkIcon from "@mui/icons-material/Work";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { NavLink } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
export const ClientAccordion = (props) => {
  return (
    <div style={{textDecoration:'none',color:'black',margin:'0px'}} to="/clients">

    <Accordion expanded={props.expanded === 'panel2'} onChange={props?.handleChange('panel2')}>
    <AccordionSummary
    expandIcon={<ArrowDropDownIcon />}
      aria-controls="panel2bh-content"
      id="panel2bh-header"
    >
      <Typography sx={{ color: 'text.secondary',mr:4, my: 0,}}>   <Person3Icon /></Typography>
      <Typography sx={{ textAlign:'center', display:'flex',justifyContent:'center' }}>
        Clients
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <ListItemButton component={NavLink} to="/clients">
      <ListItemIcon>
        <Person3Icon />
      </ListItemIcon>
      <ListItemText primary="Listing Clients" />
    </ListItemButton>
        <ListItemButton component={NavLink} to="/template">
      <ListItemIcon>
        <AddCommentIcon />
      </ListItemIcon>
      <ListItemText primary="Template" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/Projects">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItemButton>
      </AccordionDetails>
  </Accordion>
  </div>
  )
}
