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
        <Grid item xs={4}>
          <Item>
            <h2 style={{ margin: "auto", height: "50px" }}>{name}</h2>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item
            align="right"
            style={{ display: "flex", gap: "6px", justifyContent: "right" }}
          >
             {children}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
