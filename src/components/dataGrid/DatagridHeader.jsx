import React from "react";
import {Grid,Paper,Box }from '@mui/material';
import { styled } from "@mui/material/styles";
import { display } from "@mui/system";


export const DatagridHeader = ({name,children}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

 

  return (
    <>
        <Box sx={{display:'flex', gap:'14px'}}>
        <Box>
        <h2 style={{ margin: "auto", fontFamily:'Inter',fontWeight:'600', height: "50px",display:'flex',alignItems:'center' }}>{name}</h2>
        </Box>
        <Box sx={{display:'flex', gap:'7px'}}>
        {children}
        </Box>
        </Box>
        </>
        );
      };
      
      // <Grid container spacing={2}>
      //   <Grid item >
      //     <Item>
      //       <h2 style={{ margin: "auto", fontFamily:'Inter',fontWeight:'600', height: "50px",display:'flex',alignItems:'center' }}>{name}</h2>
      //     </Item>
      //   </Grid>
      //   <Grid item >
      //     <Item
      //       align="right"
      //       style={{ display: "flex", gap: "6px", justifyContent: "" }}
      //     >
      //     {children}
      //     </Item>
      //   </Grid>
      // </Grid>