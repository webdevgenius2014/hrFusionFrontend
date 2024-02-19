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
import { Link, useLocation } from 'react-router-dom';

export const ClientAccordion = (props) => {
  const url = useLocation();
  let location = url.pathname?.split('/')[1];

  return (
    <div style={{textDecoration:'none',color:'black',margin:'0px'}} to="/clients">

    <Accordion expanded={props.expanded === 'panel2'} onChange={props?.handleChange('panel2')}>
    <AccordionSummary
    expandIcon={<ArrowDropDownIcon sx={{color:location === 'clients'|| location=== 'template'|| location==='Projects' ? '#5D87FF' : '#B1B1B1'}} />}
      aria-controls="panel2bh-content"
      id="panel2bh-header"
    >
      <Typography sx={{ color: 'text.secondary',mr:4, my: 0,}}>   
      <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_128_1250)">
<path d="M10.1769 10.9233C11.6544 10.9233 12.9338 10.3933 13.9791 9.3478C15.0244 8.30243 15.5543 7.02337 15.5543 5.54569C15.5543 4.06851 15.0244 2.78928 13.9789 1.74357C12.9334 0.698378 11.6542 0.168457 10.1769 0.168457C8.69929 0.168457 7.42026 0.698378 6.37493 1.74374C5.3296 2.78911 4.79953 4.06834 4.79953 5.54569C4.79953 7.02337 5.3296 8.30261 6.3751 9.34797C7.4206 10.3932 8.6998 10.9233 10.1769 10.9233Z" fill={location === 'clients'|| location=== 'template'|| location==='Projects' ? '#5D87FF' : '#B1B1B1'}/>
<path d="M19.6447 17.3289C19.6139 16.8923 19.5516 16.4161 19.4599 15.9132C19.3673 15.4066 19.2482 14.9277 19.1055 14.4899C18.9581 14.0375 18.7576 13.5907 18.5099 13.1625C18.2527 12.7181 17.9506 12.3311 17.6117 12.0127C17.2572 11.6795 16.8233 11.4117 16.3215 11.2163C15.8214 11.022 15.2672 10.9235 14.6744 10.9235C14.4415 10.9235 14.2164 11.0174 13.7816 11.2955C13.5139 11.4669 13.2009 11.6652 12.8515 11.8845C12.5528 12.0715 12.148 12.2467 11.6481 12.4053C11.1604 12.5603 10.6652 12.6389 10.1764 12.6389C9.68766 12.6389 9.19263 12.5603 8.70438 12.4053C8.205 12.2468 7.80027 12.0716 7.50186 11.8846C7.15577 11.6674 6.84257 11.4691 6.57095 11.2953C6.13665 11.0172 5.91132 10.9233 5.6785 10.9233C5.08551 10.9233 4.53149 11.022 4.03158 11.2165C3.53011 11.4115 3.09598 11.6794 2.74119 12.0128C2.40241 12.3314 2.10017 12.7183 1.84334 13.1625C1.59574 13.5907 1.39529 14.0373 1.24774 14.4901C1.10523 14.9278 0.98604 15.4066 0.893471 15.9132C0.801772 16.4154 0.73948 16.8918 0.708682 17.3294C0.678406 17.7581 0.663094 18.203 0.663094 18.6524C0.663094 19.8219 1.04155 20.7686 1.78784 21.4669C2.52491 22.1559 3.50018 22.5054 4.68617 22.5054H15.6677C16.8537 22.5054 17.8287 22.1561 18.5659 21.4669C19.3124 20.7691 19.6908 19.8222 19.6908 18.6522C19.6906 18.2008 19.6752 17.7555 19.6447 17.3289Z" fill={location === 'clients'|| location=== 'template'|| location==='Projects' ? '#5D87FF' : '#B1B1B1'}/>
</g>
<defs>
<clipPath id="clip0_128_1250">
<rect width="20.6823" height="20.6823" fill="white" transform="translate(0.663086 0.168457)"/>
</clipPath>
</defs>
</svg>

      </Typography>
      <Typography sx={{ textAlign:'center', display:'flex',color:location === 'clients'|| location=== 'template'|| location==='Projects' ? '#5D87FF' : '#B1B1B1',justifyContent:'center' }}>
        Clients
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <ListItemButton component={NavLink} to="/clients">
      <ListItemIcon>
      <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_128_1250)">
      <path d="M10.1769 10.9233C11.6544 10.9233 12.9338 10.3933 13.9791 9.3478C15.0244 8.30243 15.5543 7.02337 15.5543 5.54569C15.5543 4.06851 15.0244 2.78928 13.9789 1.74357C12.9334 0.698378 11.6542 0.168457 10.1769 0.168457C8.69929 0.168457 7.42026 0.698378 6.37493 1.74374C5.3296 2.78911 4.79953 4.06834 4.79953 5.54569C4.79953 7.02337 5.3296 8.30261 6.3751 9.34797C7.4206 10.3932 8.6998 10.9233 10.1769 10.9233Z" fill={location === 'clients' ? '#5D87FF' : '#B1B1B1'}/>
      <path d="M19.6447 17.3289C19.6139 16.8923 19.5516 16.4161 19.4599 15.9132C19.3673 15.4066 19.2482 14.9277 19.1055 14.4899C18.9581 14.0375 18.7576 13.5907 18.5099 13.1625C18.2527 12.7181 17.9506 12.3311 17.6117 12.0127C17.2572 11.6795 16.8233 11.4117 16.3215 11.2163C15.8214 11.022 15.2672 10.9235 14.6744 10.9235C14.4415 10.9235 14.2164 11.0174 13.7816 11.2955C13.5139 11.4669 13.2009 11.6652 12.8515 11.8845C12.5528 12.0715 12.148 12.2467 11.6481 12.4053C11.1604 12.5603 10.6652 12.6389 10.1764 12.6389C9.68766 12.6389 9.19263 12.5603 8.70438 12.4053C8.205 12.2468 7.80027 12.0716 7.50186 11.8846C7.15577 11.6674 6.84257 11.4691 6.57095 11.2953C6.13665 11.0172 5.91132 10.9233 5.6785 10.9233C5.08551 10.9233 4.53149 11.022 4.03158 11.2165C3.53011 11.4115 3.09598 11.6794 2.74119 12.0128C2.40241 12.3314 2.10017 12.7183 1.84334 13.1625C1.59574 13.5907 1.39529 14.0373 1.24774 14.4901C1.10523 14.9278 0.98604 15.4066 0.893471 15.9132C0.801772 16.4154 0.73948 16.8918 0.708682 17.3294C0.678406 17.7581 0.663094 18.203 0.663094 18.6524C0.663094 19.8219 1.04155 20.7686 1.78784 21.4669C2.52491 22.1559 3.50018 22.5054 4.68617 22.5054H15.6677C16.8537 22.5054 17.8287 22.1561 18.5659 21.4669C19.3124 20.7691 19.6908 19.8222 19.6908 18.6522C19.6906 18.2008 19.6752 17.7555 19.6447 17.3289Z" fill={location === 'clients' ? '#5D87FF' : '#B1B1B1'}/>
      </g>
      <defs>
      <clipPath id="clip0_128_1250">
      <rect width="20.6823" height="20.6823" fill="white" transform="translate(0.663086 0.168457)"/>
      </clipPath>
      </defs>
      </svg>      
      </ListItemIcon>
      <ListItemText style={{color:location === 'clients' ? '#5D87FF' : '#B1B1B1'}} primary="Listing Clients" />
    </ListItemButton>
        <ListItemButton component={NavLink} to="/template">
      <ListItemIcon>
      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_128_1240)">
<path d="M18.5422 6.86774L14.7251 3.4379C13.6377 2.46074 13.094 1.97216 12.4268 1.71655L12.4179 4.34892C12.4179 6.61792 12.4179 7.75241 13.1239 8.4573C13.83 9.16218 14.9663 9.16218 17.2389 9.16218H20.6908C20.3412 8.48426 19.7153 7.92184 18.5422 6.86774Z" fill={location === 'template' ? '#5D87FF' : '#B1B1B1'}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2452 21.5715H9.10874C5.20884 21.5715 3.2589 21.5715 2.04735 20.3599C0.835816 19.1484 0.835815 17.1984 0.835815 13.2985V9.16208C0.835815 5.26218 0.835816 3.31225 2.04735 2.1007C3.2589 0.88916 5.21911 0.88916 9.13955 0.88916C9.76623 0.88916 10.2684 0.88916 10.6909 0.906388C10.6771 0.989045 10.6697 1.07337 10.6694 1.15862L10.6599 4.08972C10.6598 5.22424 10.6597 6.22689 10.7684 7.03507C10.8862 7.91109 11.1566 8.78697 11.8715 9.50179C12.5863 10.2167 13.4622 10.4871 14.3382 10.6049C15.1464 10.7136 16.149 10.7135 17.2835 10.7134H17.3817H21.4741C21.5181 11.2659 21.5181 11.944 21.5181 12.8465V13.2985C21.5181 17.1984 21.5181 19.1484 20.3065 20.3599C19.0951 21.5715 17.1451 21.5715 13.2452 21.5715ZM9.62403 13.7529C9.9442 14.0375 9.97295 14.5278 9.68846 14.848L6.93078 17.9503C6.7836 18.1159 6.57263 18.2106 6.35109 18.2106C6.12956 18.2106 5.91859 18.1159 5.77142 17.9503L4.39259 16.3991C4.10801 16.079 4.13686 15.5887 4.45701 15.3041C4.77715 15.0196 5.26738 15.0484 5.55196 15.3685L6.35109 16.2676L8.52905 13.8174C8.81363 13.4972 9.30387 13.4684 9.62403 13.7529Z" fill={location === 'template' ? '#5D87FF' : '#B1B1B1'}/>
</g>
<defs>
<clipPath id="clip0_128_1240">
<rect width="22.3369" height="20.6823" fill="white" transform="translate(0.835815 0.88916)"/>
</clipPath>
</defs>
</svg>

      </ListItemIcon>
      <ListItemText style={{color:location === 'template' ? '#5D87FF' : '#B1B1B1'}} primary="Template" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/Projects">
      <ListItemIcon>
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.0176 9.44965L20.2255 14.2583C19.7989 14.9951 18.9845 15.4604 18.0538 15.4604H2.58088C1.84408 15.4604 1.37873 14.6849 1.76652 14.0644L4.55863 9.25576C4.9852 8.51895 5.79957 8.01482 6.73027 8.01482H22.2032C22.94 8.01482 23.4054 8.82919 23.0176 9.44965ZM6.73027 6.77388C5.373 6.77388 4.17084 7.51069 3.51159 8.63529L0.835815 13.25V2.4306C0.835815 1.42234 1.65018 0.569191 2.69722 0.569191H8.90191L11.3838 3.05107H17.5885C18.5967 3.05107 19.4499 3.90421 19.4499 4.91247V6.77388H6.73027Z" fill={location === 'Projects' ? '#5D87FF' : '#B1B1B1'}/>
      </svg>
      
      </ListItemIcon>
      <ListItemText style={{color:location === 'Projects' ? '#5D87FF' : '#B1B1B1'}} primary="Projects" />
    </ListItemButton>
      </AccordionDetails>
  </Accordion>
  </div>
  )
}
