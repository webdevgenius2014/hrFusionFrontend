import React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { ImagePath } from "../../helperFunctions/HelperFunction";
import { Box } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const ClientView = ({viewClient}) => {
    // break points 
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md','lg'));  
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const styleForNonLG = {
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
    };
    const style = isLargeScreen ? {margin:0} : styleForNonLG;

  return (<>
   <Box>
            <Grid
              container
              spacing={2}
              sx={{ paddingY: 2, background: "white" }}
            >
              <Grid item xs={12} sm={12} md={4} lg={3}>
                <CardMedia
                  sx={{
                    height: 150,
                    width: 150,
                    borderRadius: "50%",
                    textAlign: "center",
                    margin: "auto",
                    border: "1px solid #dee2e6",
                    
                  }}
                  image={ImagePath(viewClient?.profile_image)}
                  title="green iguana"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={9} sx={{ fontSize:isSmallScreen ? "13px" : "",margin:'auto'}}>
                <Grid item xs={12} sm={12} md={12} lg={9} >
                  <h2 style={style}>{viewClient?.name}</h2>
                  <span style={style}>{viewClient?.email}</span>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{background:'#E2EAF5' , padding:'10px 10px',borderRadius:'10px' ,fontSize:isSmallScreen ? "13px" : ""}}>
          Client Detail
          </Box>
          <Grid
            container
            spacing={0}
            sx={{
              padding: 2,
              background: "white",
            }}
          >
           
            <Grid
              container
              spacing={0}
              sx={{ paddingTop: "10px", fontSize: "14px" ,fontSize:isSmallScreen ? "11px" : ""}}
            >
              <Grid item xs={6} sm={6} md={2} lg={3}>
                <span style={{ fontWeight: 600 }}>Phone Number </span>
              </Grid>
              <Grid item xs={6} sm={6} md={10} lg={3}>
                <span>{viewClient?.phone}</span>
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={3}>
                <span style={{ fontWeight: 600 }}>Communication </span>
              </Grid>
              <Grid item xs={6} sm={6} md={10} lg={3}>
                <span>{viewClient?.communication_channel}</span>
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={3}>
                <span style={{ fontWeight: 600 }}>Lead Platform</span>
              </Grid>
              <Grid item xs={6} sm={6} md={10} lg={3}>
                <span>{viewClient?.lead_from_platform}</span>
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={3}>
                <span style={{ fontWeight: 600 }}>Social Links</span>
              </Grid>

              <Grid item xs={6} sm={6} md={10} lg={3}>
                {viewClient?.social_links?.map((itr, index) => {
                  return (
                    <>
                      {" "}
                      <Link to="facebook.com" key={index}>
                        {Object?.keys(itr)}
                      </Link>
                      {index < viewClient?.social_links?.length - 1 && (
                        <span> ,</span>
                      )}
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          </>

  )
}
