import React, { Children } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


export const DatagridHeader = ({name,children}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

 

  return (
    <>
      <Grid container spacing={2}>
        <Grid item >
          <Item>
            <h2 style={{ margin: "auto", fontFamily:'Inter',fontWeight:'600', height: "50px",display:'flex',alignItems:'center' }}>{name}</h2>
          </Item>
        </Grid>
        <Grid item >
          <Item
            align="right"
            style={{ display: "flex", gap: "6px", justifyContent: "" }}
          >
             {children}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
