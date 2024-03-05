import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { ImagePath } from "../../helperFunctions/ImagePath";


export const ClientView = ({viewClient}) => {
  return (
    <Grid container spacing={2} sx={{ paddingY: 2, background: "white" }}>
    <Grid item xs={12} sm={12} md={12} lg={4}>
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
    <Grid item xs={12} sm={12} md={12} lg={8}>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <h2 style={{ margin: "auto" }}>{viewClient?.name}</h2>
        <span>{viewClient?.email}</span>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{ paddingTop: "10px", fontSize: "14px" }}
      >
        <Grid item xs={6} sm={6} md={2} lg={3}>
          <span style={{ fontWeight: 600 }}>Phone Number </span>
        </Grid>
        <Grid item xs={6} sm={6} md={10} lg={9}>
          <span>{viewClient?.phone}</span>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={3}>
          <span style={{ fontWeight: 600 }}>Communication </span>
        </Grid>
        <Grid item xs={6} sm={6} md={10} lg={9}>
          <span>{viewClient?.communication_channel}</span>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={3}>
          <span style={{ fontWeight: 600 }}>Lead Platform</span>
        </Grid>
        <Grid item xs={6} sm={6} md={10} lg={9}>
          <span>{viewClient?.lead_from_platform}</span>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={3}>
          <span style={{ fontWeight: 600 }}>Social Links</span>
        </Grid>

        <Grid item xs={6} sm={6} md={10} lg={9}>
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
  </Grid>
  )
}
